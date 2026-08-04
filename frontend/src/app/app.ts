import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    AvatarModule,
    TagModule,
    MenuModule,
    ButtonModule
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  profileMenuItems: MenuItem[] | undefined;
  pageTitle: string = 'Dashboard';
  isLoginPage: boolean = false;
  showNewRequestBtn: boolean = false;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateRouteState();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateRouteState();
    });

    this.profileMenuItems = [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        separator: true 
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout(); 
          this.router.navigate(['/login']); 
        }
      }
    ];
  }

  private updateRouteState() {
    this.isLoginPage = this.router.url.includes('/login');
    const currentUrl = this.router.url;
    this.showNewRequestBtn = currentUrl.includes('/dashboard') || currentUrl.includes('/my-requests');

    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    this.pageTitle = route?.snapshot.data['title'] || 'Dashboard';
  }

  initiateNewRequest(): void {
    console.log('Initiating new request...');
  }
}