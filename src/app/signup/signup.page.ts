import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  nombre: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false; // Añadimos esta variable
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.loading = true; // Mostramos la pantalla de carga
    this.error = ''; // Limpiamos cualquier mensaje de error previo

    this.authService.register(this.nombre, this.email, this.password).subscribe(
      (response) => {
        this.loading = false; // Ocultamos la pantalla de carga
        if (response && response.msg === 'Usuario registrado correctamente') {
          this.router.navigate(['/login']);
        } else {
          this.error = 'Error al registrar';
        }
      },
      (error) => {
        this.loading = false; // Ocultamos la pantalla de carga
        this.error = error;
      }
    );
  }
}
