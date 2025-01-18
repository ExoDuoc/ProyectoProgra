import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  error = {
    email: false,
    password: false
  };

  constructor(private router: Router) {}

  ingresar() {
    // Reiniciamos los errores antes de validar
    this.error.email = !this.user.email;
    this.error.password = !this.user.password;

    // Si hay algún campo vacío, mostramos los errores
    if (this.error.email || this.error.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validación de credenciales
    if (this.user.email === 'admin' && this.user.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  recuperarContrasena() {
    alert('Recuperar contraseña');
  }
}
