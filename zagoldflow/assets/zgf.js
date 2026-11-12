// ZAGoldFlow public pages: language switch, header state, TOC tracking, gold dust.
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // ---- language ----
  const titles = { ar: root.dataset.titleAr, en: root.dataset.titleEn };
  const fromUrl = new URLSearchParams(location.search).get('lang');
  let stored = null;
  try { stored = localStorage.getItem('zgf-lang'); } catch (_) { /* storage blocked */ }
  const setLang = (lang, persist) => {
    if (lang !== 'ar' && lang !== 'en') lang = 'ar';
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (titles[lang]) document.title = titles[lang];
    document.querySelectorAll('.lang button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.set === lang)));
    if (persist) { try { localStorage.setItem('zgf-lang', lang); } catch (_) { /* ignore */ } }
  };
  setLang(fromUrl || stored || 'ar', false);
  document.querySelectorAll('.lang button').forEach((b) =>
    b.addEventListener('click', () => setLang(b.dataset.set, true)));

  // ---- header ----
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  // ---- TOC: highlight the section being read ----
  const links = [...document.querySelectorAll('.toc a')];
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        byId.get(e.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // ---- gold dust: a few slow flecks rising through the hero ----
  const canvas = document.querySelector('.dust');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1, flecks = [], running = true, raf = 0;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(60, (w * h) / 16000));
    flecks = Array.from({ length: n }, () => spawn(true));
  };
  const spawn = (anywhere) => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : h + 10,
    r: Math.random() * 1.6 + .4,
    vy: Math.random() * .25 + .08,
    drift: Math.random() * Math.PI * 2,
    a: Math.random() * .55 + .2,
  });
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flecks) {
      f.y -= f.vy; f.drift += .01; f.x += Math.sin(f.drift) * .15;
      if (f.y < -10) Object.assign(f, spawn(false));
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3);
      g.addColorStop(0, `rgba(255, 226, 140, ${f.a})`);
      g.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 3, 0, Math.PI * 2); ctx.fill();
    }
    if (running) raf = requestAnimationFrame(tick);
  };
  resize(); addEventListener('resize', resize);
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running) raf = requestAnimationFrame(tick);
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden; cancelAnimationFrame(raf); if (running) raf = requestAnimationFrame(tick);
  });
})();
