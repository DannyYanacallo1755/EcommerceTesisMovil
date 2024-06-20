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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.register(this.nombre, this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        if (response && response.msg === 'Usuario registrado correctamente') {
          this.router.navigate(['/login']);
        } else {
          this.error = 'Error al registrar';
        }
      },
      (error) => {
        console.error(error);
        this.error = error;
      }
    );
  }
}
