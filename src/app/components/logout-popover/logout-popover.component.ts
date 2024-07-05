import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-logout-popover',
  templateUrl: './logout-popover.component.html',
  styleUrls: ['./logout-popover.component.scss'],
})
export class LogoutPopoverComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private platform: Platform
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  exitApp() {
    if (this.platform.is('android')) {
      (navigator as any).app.exitApp();
    }
  }
}
