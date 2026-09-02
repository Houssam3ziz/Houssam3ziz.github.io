/**
 * Tech stack — only technologies found in shipped or active codebases.
 * `projects` links a skill to the project ids that use it (drives the
 * hover → related-projects interaction).
 */
export const skillGroups = [
  {
    id: 'mobile',
    label: 'Mobile',
    skills: [
      { name: 'Flutter', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'outservices', 'ici-inspection', 'attendsmart', 'dalelak', 'beit-al-mal', 'truck-bite', 'qube'] },
      { name: 'Dart', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'outservices', 'ici-inspection', 'attendsmart', 'dalelak'] },
      { name: 'Material 3 & RTL UI', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', 'ici-inspection', 'qube'] },
      { name: 'Responsive (phone / tablet / desktop)', level: 'strong', projects: ['zagoldflow', 'fashion-erp'] },
      { name: 'Localisation (l10n / intl)', level: 'strong', projects: ['ana-57357', '57357-app', 'ici-inspection', 'attendsmart', 'dalelak'] },
      { name: 'Shorebird OTA patches', level: 'used', projects: ['ana-57357'] },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & State',
    skills: [
      { name: 'Clean / Feature-first Architecture', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', 'ici-inspection', 'dalelak'] },
      { name: 'BLoC / Cubit', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'ici-inspection', 'attendsmart', 'dalelak'] },
      { name: 'Repository Pattern', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'outservices', 'ici-inspection'] },
      { name: 'Dependency Injection (get_it)', level: 'strong', projects: ['ana-57357', '57357-app', 'outservices', 'ici-inspection'] },
      { name: 'Offline-first & Sync Outbox', level: 'strong', projects: ['zagoldflow', 'fashion-erp', 'ici-inspection'] },
      { name: 'GetX / Riverpod / Provider', level: 'used', projects: ['57357-app', 'outservices', 'beit-al-mal', 'truck-bite', 'qube'] },
      { name: 'Functional errors (dartz Either)', level: 'strong', projects: ['ana-57357', '57357-app', 'outservices'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    skills: [
      { name: 'REST APIs (Dio)', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'outservices', 'ici-inspection', 'attendsmart'] },
      { name: 'Laravel 13 / PHP 8.3', level: 'strong', projects: ['zagoldflow', 'fashion-erp', 'attendsmart'] },
      { name: 'Filament admin panels', level: 'strong', projects: ['zagoldflow', 'fashion-erp'] },
      { name: 'Multi-tenant RBAC', level: 'strong', projects: ['zagoldflow', 'fashion-erp'] },
      { name: 'WebSockets / realtime', level: 'used', projects: ['zagoldflow', 'fashion-erp'] },
      { name: 'Payment gateway integration', level: 'used', projects: ['57357-app'] },
    ],
  },
  {
    id: 'data',
    label: 'Data & Storage',
    skills: [
      { name: 'Isar', level: 'core', projects: ['zagoldflow', 'fashion-erp'] },
      { name: 'Drift / SQLite', level: 'strong', projects: ['ici-inspection'] },
      { name: 'Firebase (Auth, FCM, Remote Config)', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app', 'outservices', 'dalelak'] },
      { name: 'Secure storage & biometrics', level: 'strong', projects: ['ana-57357', 'attendsmart', 'ici-inspection', 'fashion-erp'] },
      { name: 'MySQL / PostgreSQL / Redis', level: 'used', projects: ['zagoldflow', 'fashion-erp', 'attendsmart'] },
    ],
  },
  {
    id: 'devops',
    label: 'Tooling & Delivery',
    skills: [
      { name: 'Git · GitHub · Azure DevOps', level: 'core', projects: ['ana-57357', 'zagoldflow', 'fashion-erp', '57357-app'] },
      { name: 'App Store & Play releases', level: 'strong', projects: ['ana-57357', 'outservices'] },
      { name: 'Unit & widget tests', level: 'strong', projects: ['fashion-erp', 'zagoldflow', 'ici-inspection'] },
      { name: 'PDF generation & thermal printing', level: 'strong', projects: ['zagoldflow', 'fashion-erp', 'ici-inspection', '57357-app'] },
      { name: 'Barcode / QR scanning', level: 'used', projects: ['zagoldflow', 'fashion-erp', 'qube'] },
      { name: 'Windows desktop builds', level: 'used', projects: ['fashion-erp'] },
    ],
  },
];
