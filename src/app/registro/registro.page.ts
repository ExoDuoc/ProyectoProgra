import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user: any = {
    nombre: '',
    email: '',
    password: '',
    f_nacimiento: '',
    genero: '',
    presupuestos: [], // Inicializamos con un array vacío para los presupuestos
  };

  error: boolean = false; // Indica si hay errores
  mensajeError: string = ''; // Mensaje de error específico

  constructor(private usuarioService: UsuarioService, private router : Router) {}

  ngOnInit() {
  }

  registrar() {
    // Validar que todos los campos estén llenos
    if (
      !this.user.nombre ||
      !this.user.email ||
      !this.user.password ||
      !this.user.f_nacimiento ||
      !this.user.genero
    ) {
      this.error = true;
      this.mensajeError = 'Por favor, complete todos los campos.';
      alert(this.mensajeError);
      return;
    }


    // Verificar si el usuario ya existe
    this.usuarioService.verificarUsuario(this.user.email).subscribe(
      (usuariosExistentes) => {
        if (usuariosExistentes.length > 0) {
          // Si ya existe un usuario con ese correo
          this.error = true;
          this.mensajeError = '¡Éste correo ya ha sido registrado! Intenta con otro.';
          alert(this.mensajeError);
        } else {
          // Registrar el usuario
          this.usuarioService.registrarUsuario(this.user).subscribe(
            (response) => {
              this.error = false;
              this.mensajeError = '';
              alert('Usuario registrado con éxito.');
              this.limpiarFormulario(); // Limpiar el formulario después del registro
              this.router.navigate(['/login']);
            },
            (error) => {
              console.error('Error al registrar el usuario:', error);
              this.error = true;
              this.mensajeError = 'Ocurrió un error al registrar el usuario.';
              alert(this.mensajeError);
            }
          );
        }
      },
      (error) => {
        console.error('Error al verificar el usuario:', error);
        this.error = true;
        this.mensajeError = 'Ocurrió un error al verificar el usuario.';
        alert(this.mensajeError);
      }
    );
  }

  limpiarFormulario() {
    this.user = {
      nombre: '',
      email: '',
      password: '',
      f_nacimiento: '',
      genero: '',
      presupuestos: [], // Restablecemos el array de presupuestos
    };
  }
}
