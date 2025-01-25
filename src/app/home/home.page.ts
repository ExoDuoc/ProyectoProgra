import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class HomePage {

  // Lista de presupuestos (simulada sin conexión a DB)
  presupuestos: Presupuesto[] = [
    { nombre: 'Presupuesto 1', descripcion: 'Descripción del presupuesto 1' },
    { nombre: 'Presupuesto 2', descripcion: 'Descripción del presupuesto 2' },
  ];

  // Inyecta Router en el constructor
  constructor(private router: Router) { }

  // Acción Crear Presupuesto
  crearPresupuesto() {
  const nuevoPresupuesto = { nombre: `Presupuesto ${this.presupuestos.length + 1}`, descripcion: 'Nueva descripción' };
  this.presupuestos.push(nuevoPresupuesto);  // Agrega el nuevo presupuesto a la lista
  this.router.navigate(['/presupuesto', nuevoPresupuesto.nombre]);  // Redirige a la página de Presupuesto con el nombre
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

  // CRUD (sin conexión a DB)
  crear() {
    alert('Crear acción');
  }

  modificar() {
    alert('Modificar acción');
  }

  eliminar() {
    alert('Eliminar acción');
  }

  // Función para cerrar sesión
  cerrarSesion() {
    // Aquí puedes realizar cualquier acción necesaria para cerrar la sesión, como limpiar datos de usuario o redirigir a login.
    localStorage.removeItem('token'); // Elimina el token del localStorage
    alert('Sesión cerrada');
    this.router.navigate(['/login']);  // Redirige al login
  }
}