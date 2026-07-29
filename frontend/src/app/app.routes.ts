import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard'; 
import { ManageRequests } from './pages/manage-requests/manage-requests';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { ManageTeam } from './pages/manage-team/manage-team';
import { Team } from './pages/team/team';
import { MyRequests } from './pages/my-requests/my-requests';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'my-requests', component: MyRequests }, 
  { path: 'team', component: Team }, 
  { path: 'manage-requests', component: ManageRequests}, 
  { path: 'manage-team', component: ManageTeam}, 
  { path: 'admin-panel', component: AdminPanel},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];