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
  { path: 'dashboard', component: Dashboard, data: { title: 'Dashboard' } },
  { path: 'my-requests', component: MyRequests, data: { title: 'Cererile Tale' } }, 
  { path: 'team', component: Team, data: { title: 'Echipa' } }, 
  { path: 'manage-requests', component: ManageRequests, data: { title: 'Management Cereri' } }, 
  { path: 'manage-team', component: ManageTeam, data: { title: 'Management Echipa' } }, 
  { path: 'admin-panel', component: AdminPanel, data: { title: 'Admin Panel' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];