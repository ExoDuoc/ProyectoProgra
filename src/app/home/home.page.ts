import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service'; // Asegúrate de que el path sea correcto

// Definir la interfaz para un presupuesto
interface Presupuesto {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  presupuestos: Presupuesto[] = []; // Lista inicial vacía
  noHayPresupuestos: boolean = false; // Flag para mostrar mensaje de "no hay presupuestos"
  usuarioEmail: string | null = null; // Para almacenar el email del usuario autenticado

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    // Obtén el email del usuario autenticado desde el localStorage
    this.usuarioEmail = localStorage.getItem('usuarioAutenticado');
  
    if (this.usuarioEmail) {
      // Consulta los usuarios en la base de datos y encuentra al usuario con el email correspondiente
      this.usuarioService.obtenerUsuarios().subscribe(
        (usuarios) => {
          const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === this.usuarioEmail
          );
          
          if (usuarioEncontrado) {
            // Si se encuentra el usuario, asigna sus presupuestos
            this.presupuestos = usuarioEncontrado.presupuestos;
            console.log("presepuesto del usuario : ", this.presupuestos)
            this.noHayPresupuestos = this.presupuestos.length === 0; // Determina si no hay presupuestos
          } else {
            this.noHayPresupuestos = true; // Si no se encuentra el usuario
          }
        },
        (error) => {
          console.error('Error al cargar los usuarios:', error);
          alert('Ocurrió un error al cargar los presupuestos.');
        }
      );
    } else {
      alert('No se encontró un usuario autenticado.');
      this.router.navigate(['/login']);
    }
  }
  
  // Acción Crear Presupuesto
  crearPresupuesto() {
    this.router.navigate(['/presupuesto']);  // Redirige a la página de Presupuesto con el nombre
  }

  // Acción Editar Presupuesto
  editarPresupuesto(presupuesto: Presupuesto) {
    const index = this.presupuestos.indexOf(presupuesto);
    this.presupuestos[index] = { ...presupuesto, nombre: 'Presupuesto Editado', descripcion: 'Descripción actualizada' };
    alert('Presupuesto editado!');
  }

  // Acción Eliminar Presupuesto
  eliminarPresupuesto(presupuesto: Presupuesto) {
    const index = this.presupuestos.indexOf(presupuesto);
    if (index !== -1) {
      this.presupuestos.splice(index, 1);
      alert('Presupuesto eliminado!');
    }
  }

  // Función para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('email'); // Elimina el email del usuario del localStorage
    alert('Sesión cerrada');
    this.router.navigate(['/login']);  // Redirige al login
  }
}
