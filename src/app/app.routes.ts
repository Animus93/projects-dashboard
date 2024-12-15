import {Routes} from '@angular/router';
import {ProjectsDashboardComponent} from './components/projects-dashboard/projects-dashboard.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/projects-dashboard/projects.routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
];
