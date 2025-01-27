import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastosService } from '../services/gastos.service'; 


@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit {
  nombrePresupuesto: string = '';
  descripcionPresupuesto: string = '';
  montoPresupuesto: number = 0;
  categorias: string[] = []; 
  categoriaSeleccionada: string = ''; 
  emailUsuario: any; // Variable para almacenar el email del usuario logueado

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gastosService: GastosService
  ) {}

  ngOnInit() {
    // Obtener el email del usuario logueado desde el localStorage
    const usuarioGuardado = localStorage.getItem('usuarioAutenticado');
    this.emailUsuario = usuarioGuardado; // Obtener el email del usuario logueado

    // Obtener las categorías
    this.gastosService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias.map(categoria => categoria.nombre); 
    });
  }

  // Función para crear un nuevo presupuesto
  async crearPresupuesto() {
    if (this.validarFormulario()) {
      const nuevoPresupuesto = {
        id: this.generarIdUnico(), // Asigna un ID único
        nombre: this.nombrePresupuesto,
        descripcion: this.descripcionPresupuesto,
        monto: this.montoPresupuesto,
        categoria: this.categoriaSeleccionada, 
        gastos: [] // Lista vacía de gastos por defecto
      };

      // Llamamos al servicio para guardar el presupuesto en el db.json
      this.gastosService.guardarPresupuesto(nuevoPresupuesto, this.emailUsuario).subscribe(
        (respuesta) => {
          alert('Nuevo presupuesto creado con éxito');
          this.router.navigate(['/home']);
        },
        (error) => {
          alert('Error al crear el presupuesto: ' + error.message);
        }
      );
    }
  }

  generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9); // O usa una librería para UUID
  }
  
  abrirModalCrearCategoria() {
    // Aquí debes implementar la lógica para abrir un modal o un cuadro de texto
    // que permita al usuario ingresar una nueva categoría.
    const nuevaCategoria = prompt('Ingrese el nombre de la nueva categoría:');
    if (nuevaCategoria) {
      this.gastosService.agregarCategoria(nuevaCategoria); // Guardamos la nueva categoría
      this.categorias.push(nuevaCategoria); // Actualizamos el dropdown
      alert('Categoría creada exitosamente');
    }
  }
  
  validarFormulario(): boolean {
    if (!this.nombrePresupuesto || !this.descripcionPresupuesto || this.montoPresupuesto <= 0) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return false;
    }
    return true;
  }

  // Función para regresar al home
  regresar() {
    this.router.navigate(['/home']);
  }
}