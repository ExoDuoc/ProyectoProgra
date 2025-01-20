import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';

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
  };

  error: boolean = false; // Para mostrar errores de campos vacíos
  mensajeError: string = ''; // Para mensajes de error específicos

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {}

  registrar() {
    // Validar campos vacíos
    if (
      !this.user.nombre ||
      !this.user.email ||
      !this.user.password ||
      !this.user.f_nacimiento ||
      !this.user.genero
    ) {
      this.error = true;
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Intentar registrar el usuario
    const resultado = this.usuarioService.registrarUsuario(this.user);
    console.log("Resultado",resultado)
    if (!resultado.success) {
      this.error = true;
      console.log("Correo ya ha sido registrado",resultado)
      alert("¡Éste correo ya ha sido registrado! Intenta con otro");
      this.mensajeError = resultado.message; // Mostrar error si el correo ya está registrado
    } else {
      console.log("Correo ",resultado)
      this.error = false;
      this.mensajeError = '';
      alert(resultado.message); // Usuario registrado con éxito
      this.limpiarFormulario(); // Limpia el formulario después del registro
    }
  }

  limpiarFormulario() {
    this.user = {
      nombre: '',
      email: '',
      password: '',
      f_nacimiento: '',
      genero: '',
    };
  }
}
