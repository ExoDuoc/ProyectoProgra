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

  error: boolean = false; // Se usa para mostrar mensajes de error

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {}

  registrar() {
    // Verificar si hay campos vacíos
    if (
      !this.user.nombre ||
      !this.user.email ||
      !this.user.password ||
      !this.user.f_nacimiento ||
      !this.user.genero
    ) {
      this.error = true; // Activa los mensajes de error si hay campos vacíos
      return;
    }

    this.error = false; // Limpia el estado de error si todos los campos están completos

    console.log('Registrando...');
    console.log(this.user);

    this.usuarioService.registrarUsuario(this.user).subscribe(
      (res) => {
        console.log(res);
        alert('¡Usuario registrado con éxito!');
      },
      (err) => {
        console.error(err);
        alert('Hubo un error al registrar el usuario.');
      }
    );
  }
}
