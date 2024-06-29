import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          // Credenciales válidas, redirigir al home
          this.router.navigate(['/home']).then(() => {
            this.loading = false;
          });
        } else {
          // Credenciales inválidas, mostrar mensaje de error
          this.loading = false;
          this.error = 'Credenciales inválidas';
        }
      },
      (error) => {
        this.loading = false;
        this.error = 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.';
      }
    );
  }
}
