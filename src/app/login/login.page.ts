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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        if (response && response.token) {
          // Credenciales válidas, redirigir al home
          this.router.navigate(['/home']);
        } else {
          // Credenciales inválidas, mostrar mensaje de error
          this.error = 'Credenciales inválidas';
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Error en el servidor';
      }
    );
  }
}
