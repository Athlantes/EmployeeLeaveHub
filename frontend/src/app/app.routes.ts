import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard'; 
import { ManageRequests } from './pages/manage-requests/manage-requests';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { ManageTeam } from './pages/manage-team/manage-team';
import { Team } from './pages/team/team';
import { MyRequestsComponent } from './pages/my-requests/my-requests';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'dashboard', component: Dashboard, data: { title: 'Dashboard' }, canActivate: [authGuard] },
  { path: 'my-requests', component: MyRequestsComponent, data: { title: 'My Requests' }, canActivate: [authGuard] }, 
  { path: 'team', component: Team, data: { title: 'Team' }, canActivate: [authGuard] }, 
  { path: 'manage-requests', component: ManageRequests, data: { title: 'Management Requests' }, canActivate: [authGuard] }, 
  { path: 'manage-team', component: ManageTeam, data: { title: 'Management Team' }, canActivate: [authGuard] }, 
  { path: 'admin-panel', component: AdminPanel, data: { title: 'Admin Panel' }, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];