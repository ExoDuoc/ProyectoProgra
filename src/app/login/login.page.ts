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

  constructor(private router: Router) {}

  ingresar() {
    // Aquí deberías agregar la lógica para verificar las credenciales
    if (this.user.email === 'admin' && this.user.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  recuperarContrasena() {
    // Lógica para recuperar contraseña
    alert('Recuperar contraseña');
  }
}
