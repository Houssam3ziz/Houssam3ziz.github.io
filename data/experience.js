/** Experience & education — sourced from CV and repository history. */
export const experience = [
  {
    company: 'Children’s Cancer Hospital Egypt 57357 (CCHE)',
    position: 'Mobile Developer — App Development Team',
    period: 'Oct 2025 — Present',
    location: 'Cairo, Egypt',
    summary:
      'Part of the in-house team that builds and ships the hospital’s Flutter apps for patients, donors and staff.',
    highlights: [
      'Ana 57357 patient app: vital signs, WHO/CDC growth charts, surveys, help center, appointment rules — live on both stores (4.9★ on Google Play).',
      '57357 donation app Flutter rebuild: payment flow, campaigns, zakat/sadaqa, awards, certificates, notifications.',
      '57357 Out Services: results module & MRN verification for the Jan 2026 store release.',
      'AttendSmart academy attendance pilot with device binding and biometric check-in.',
      'Authored internal engineering guidelines (API loading practices, refactoring guide).',
    ],
    stack: ['Flutter', 'Cubit / BLoC', 'GetX', 'Dio', 'Firebase', 'Shorebird', 'Azure DevOps'],
  },
  {
    company: 'Independent product engineering',
    position: 'Flutter & Laravel Engineer',
    period: '2026 — Present',
    location: 'Remote · Egypt',
    summary:
      'End-to-end ownership of ERP products for retail clients: mobile/desktop apps, backend APIs, admin dashboards and releases.',
    highlights: [
      'ZA Gold Flow — offline-first gold-shop ERP (28 modules, 26 releases) with a multi-tenant Laravel/Filament API.',
      'Fashion ERP — retail ERP with POS, thermal printing, payroll and idempotent sync; 52 test files; Windows + Android releases.',
      'I.C.I Inspection — architecture blueprint and MVP for a field inspection & valuation platform.',
    ],
    stack: ['Flutter', 'Isar', 'Drift', 'Laravel 13', 'Filament 4', 'WebSockets', 'FCM'],
  },
];

export const education = [
  { title: 'Advanced Flutter Diploma', org: 'Route Company', year: '2025' },
  { title: 'Flutter & Dart', org: 'Udemy — Tharwat Samy', year: '2024' },
  { title: 'B.Sc. — Faculty of Agricultural Engineering', org: 'Al-Azhar University', year: '2023' },
];
