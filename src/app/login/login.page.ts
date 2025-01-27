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
        // Buscar si existe un usuario que coincida con el email y la contraseña
        const usuarioValido = usuarios.find(
          (usuario) => usuario.email === this.user.email && usuario.password === this.user.password
        );
        
        if (usuarioValido) {
          // Credenciales correctas
          localStorage.setItem('usuarioAutenticado', this.user.email); // Guardamos el email
          localStorage.setItem('token', 'usuarioAutenticado');
          localStorage.setItem('usuarioId', usuarioValido.id); // Guardamos el id del usuario para futuras referencias
          this.router.navigate(['/home']).then(() => {
            alert('Inicio de sesión exitoso.');
          });
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
