import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showPassword = false;
  error: string = '';
  loading: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.resetPassword(this.email, this.newPassword).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
