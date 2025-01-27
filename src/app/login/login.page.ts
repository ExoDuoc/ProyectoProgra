import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

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

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ingresar() {
    // Reiniciamos los errores antes de validar
    this.error.email = !this.user.email;
    this.error.password = !this.user.password;

    // Si hay algún campo vacío, mostramos los errores
    if (this.error.email || this.error.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Consultar el db.json para validar las credenciales
    this.usuarioService.validarUsuario(this.user.email, this.user.password).subscribe(
      (usuarios: any[]) => {
        if (usuarios.length > 0) {
          // Credenciales correctas
          localStorage.setItem('token', 'usuarioAutenticado');
          alert('Inicio de sesión exitoso.');
          this.router.navigate(['/home']);
        } else {
          // Credenciales incorrectas
          alert('Credenciales incorrectas.');
        }
      },
      (error) => {
        console.error('Error al validar el usuario:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
      }
    );
  }

  recuperarContrasena() {
    alert('Recuperar contraseña');
  }
}
