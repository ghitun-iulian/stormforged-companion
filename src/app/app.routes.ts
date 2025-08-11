import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/asset-manager/asset-manager').then(
        (m) => m.AssetManager
      ),
  },
  {
    path: 'manual',
    loadComponent: () =>
      import('./modules/manual/manual').then((m) => m.Manual),
  },
  {
    path: 'playtest',
    loadComponent: () =>
      import('./modules/playtest/playtest').then((m) => m.Playtest),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
