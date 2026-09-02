/**
 * "How I build" — animated system diagram (SVG). Links draw on scroll,
 * data particles flow along paths, hover highlights a node's connections,
 * click shows implementation notes from real projects.
 */
import { $, $$, esc, prefersReducedMotion } from '../core/env.js';
import { onceVisible } from '../core/reveal.js';

const NODES = [
  { id: 'ui', x: 280, y: 30, w: 260, label: 'UI · Widgets', sub: 'pages / widgets', desc: 'Screens are thin. They render state and dispatch intents — no networking, no storage.', points: ['Responsive shell: NavigationRail on tablet/desktop, bottom nav on phone (ZA Gold Flow, Fashion ERP).', 'Shared primitives: EmptyState, ErrorState, ConfirmDialog, AppPaginationBar, OfflineBanner.', 'Arabic-first RTL with generated l10n.'], code: 'BlocBuilder<InventoryCubit, InventoryState>(\n  builder: (_, s) => s.when(\n    loading: AppLoading.new,\n    loaded: (items) => ItemsGrid(items),\n    error: (f) => ErrorState(f.message),\n  ),\n)' },
  { id: 'cubit', x: 280, y: 150, w: 260, label: 'Cubit / BLoC', sub: 'state orchestration', desc: 'Cubits subscribe to repository streams and expose immutable state. They never touch Dio, Isar or Firebase directly.', points: ['Equatable states with loading / loaded / error variants.', 'Feature flags & remote config resolved here, not in widgets.', 'Unit-tested with fake repositories (52 test files in Fashion ERP).'], code: 'class SalesCubit extends Cubit<SalesState> {\n  SalesCubit(this._repo) : super(SalesState.initial()) {\n    _sub = _repo.watchDrafts().listen(_onDrafts);\n  }\n  Future<void> commit(CartDraft d) =>\n      _repo.commit(d).then(_emitResult);\n}' },
  { id: 'repo', x: 280, y: 270, w: 260, label: 'Repository', sub: 'single source of truth', desc: 'Repositories hide where data lives. They return typed results and watch streams so the UI is always reactive.', points: ['safeApiCall → Either<Failure, T> for every remote call.', 'Local-first: write to Isar/Drift in one transaction, then enqueue a sync operation.', 'Watch-stream cache + replay so late subscribers get the latest value.'], code: 'Future<Either<Failure, Sale>> commit(CartDraft d) =>\n  safeCall(() async {\n    final sale = await _isar.writeTxn(() async {\n      final s = await _sales.put(d.toSale());\n      await _ledger.post(s);\n      await _outbox.enqueue(SyncOp.sale(s));\n      return s;\n    });\n    _sync.kick();\n    return sale;\n  });' },
  { id: 'api', x: 10, y: 410, w: 240, label: 'REST API', sub: 'Dio · Laravel', desc: 'A Dio client with auth interceptors talks to Laravel (ERPs) or the hospital APIs. Sync is idempotent and delta-based.', points: ['Queued token refresh interceptor avoids refresh races.', 'Laravel 13 + Filament: multi-tenant RBAC, subscriptions, /sync endpoint with optimistic concurrency.', 'WebSocket realtime events invalidate caches on other devices.'], code: 'dio.interceptors.add(QueuedInterceptorsWrapper(\n  onRequest: (o, h) async {\n    o.headers[\'Authorization\'] =\n        \'Bearer ${await _auth.idToken()}\';\n    h.next(o);\n  },\n));' },
  { id: 'db', x: 290, y: 410, w: 240, label: 'Local DB', sub: 'Isar · Drift', desc: 'The device database is the source of truth for ERP and inspection apps. Serial write queue, backups and migrations.', points: ['Isar collections for gold items, sales, ledger, vault, journal (ZA Gold Flow).', 'Drift/SQLite tables + sync queue with ordered handlers (I.C.I).', 'Automatic backup & recovery of the database file.'], code: 'Future<T> write<T>(Future<T> Function() op) =>\n  _queue = _queue.then((_) => _isar.writeTxn(op));' },
  { id: 'services', x: 570, y: 410, w: 240, label: 'Device services', sub: 'FCM · printing · auth', desc: 'Platform integrations live behind small service classes so features can be tested without hardware.', points: ['Firebase Messaging + local notifications, Remote Config, Shorebird OTA.', 'PDF receipts, QR labels, ESC/POS Bluetooth printing.', 'Biometrics, secure storage, barcode & HID scanners, camera/GPS evidence.'], code: 'abstract class PrintingService {\n  Future<void> receipt(Sale s);\n  Future<void> label(GoldItem i);\n}' },
];

const LINKS = [
  ['ui', 'cubit'], ['cubit', 'repo'], ['repo', 'api'], ['repo', 'db'], ['repo', 'services'],
];

const center = (n) => ({ x: n.x + n.w / 2, y: n.y + 30 });

function pathFor(a, b) {
  const A = center(a), B = center(b);
  const y1 = a.y + 60, y2 = b.y;
  const midY = (y1 + y2) / 2;
  return `M ${A.x} ${y1} C ${A.x} ${midY}, ${B.x} ${midY}, ${B.x} ${y2}`;
}

function svgMarkup() {
  const links = LINKS.map(([a, b], i) => {
    const d = pathFor(NODES.find((n) => n.id === a), NODES.find((n) => n.id === b));
    return `<path class="link" id="link-${a}-${b}" data-a="${a}" data-b="${b}" d="${d}" style="--i:${i}"/>`;
  }).join('');
  const nodes = NODES.map((n, i) => `
    <g class="node" data-id="${n.id}" style="--i:${i}" tabindex="0" role="button" aria-label="${esc(n.label)}: ${esc(n.desc)}">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="60" rx="14"/>
      <text x="${n.x + n.w / 2}" y="${n.y + 27}" text-anchor="middle">${esc(n.label)}</text>
      <text class="sub" x="${n.x + n.w / 2}" y="${n.y + 46}" text-anchor="middle">${esc(n.sub)}</text>
    </g>`).join('');
  return `<svg viewBox="0 0 820 490" role="group" aria-label="Data flow: UI → Cubit → Repository → API, local database and device services">${links}${nodes}<g id="particles"></g></svg>`;
}

function spawnParticles(svg) {
  if (prefersReducedMotion) return;
  const g = svg.querySelector('#particles');
  const ns = 'http://www.w3.org/2000/svg';
  LINKS.forEach(([a, b], i) => {
    for (let k = 0; k < 2; k++) {
      const rev = k === 1;
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('r', '3'); c.setAttribute('class', `particle${rev ? ' rev' : ''}`);
      const m = document.createElementNS(ns, 'animateMotion');
      m.setAttribute('dur', `${2.6 + (i % 3) * 0.5}s`); m.setAttribute('repeatCount', 'indefinite');
      m.setAttribute('begin', `${(i * 0.4 + k * 1.3).toFixed(1)}s`);
      if (rev) m.setAttribute('keyPoints', '1;0'), m.setAttribute('keyTimes', '0;1'), m.setAttribute('calcMode', 'linear');
      const mp = document.createElementNS(ns, 'mpath');
      mp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#link-${a}-${b}`);
      mp.setAttribute('href', `#link-${a}-${b}`);
      m.appendChild(mp); c.appendChild(m); g.appendChild(c);
    }
  });
}

function renderPanel(panel, n) {
  panel.innerHTML = `
    <span class="mono">${esc(n.sub)}</span>
    <h3>${esc(n.label)}</h3>
    <p>${esc(n.desc)}</p>
    <ul>${n.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    <code tabindex="0" aria-label="Code example">${esc(n.code)}</code>`;
}

export function initArchitecture() {
  const host = $('#arch');
  const panel = $('#archPanel');
  if (!host || !panel) return;
  host.innerHTML = svgMarkup() + '<div class="arch__hint"><span><i style="background:var(--accent)"></i>requests / writes</span><span><i style="background:var(--accent-2)"></i>state / streams back to the UI</span><span>hover to trace · click for details</span></div>';
  const svg = host.querySelector('svg');
  renderPanel(panel, NODES[2]);
  $$('.node', svg).find((n) => n.dataset.id === 'repo')?.classList.add('is-active');

  onceVisible(host, () => { host.classList.add('is-visible'); setTimeout(() => spawnParticles(svg), prefersReducedMotion ? 0 : 900); }, { threshold: 0.25 });

  const highlight = (id) => {
    const connected = new Set([id]);
    LINKS.forEach(([a, b]) => { if (a === id) connected.add(b); if (b === id) connected.add(a); });
    $$('.node', svg).forEach((n) => n.classList.toggle('is-dim', !connected.has(n.dataset.id)));
    $$('.link', svg).forEach((l) => { const on = l.dataset.a === id || l.dataset.b === id; l.classList.toggle('is-active', on); l.classList.toggle('is-dim', !on); });
  };
  const clear = () => { $$('.node, .link', svg).forEach((el) => el.classList.remove('is-dim', 'is-active')); $$('.node', svg).find((n) => n.dataset.id === selected)?.classList.add('is-active'); };
  let selected = 'repo';

  svg.addEventListener('pointerover', (e) => { const n = e.target.closest('.node'); if (n) highlight(n.dataset.id); });
  svg.addEventListener('pointerleave', clear);
  const select = (n) => { selected = n.dataset.id; renderPanel(panel, NODES.find((x) => x.id === selected)); clear(); highlight(selected); };
  svg.addEventListener('click', (e) => { const n = e.target.closest('.node'); if (n) select(n); });
  svg.addEventListener('keydown', (e) => { const n = e.target.closest('.node'); if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(n); } });
  svg.addEventListener('focusin', (e) => { const n = e.target.closest('.node'); if (n) highlight(n.dataset.id); });
}
