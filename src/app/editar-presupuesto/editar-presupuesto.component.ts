import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastosService } from '../services/gastos.service';

export interface Presupuesto {
  id: string;
  nombre: string;
  descripcion: string;
  monto: number;
  categoria: string;
  gastos: any[]; // Ajusta este tipo según la estructura real de los gastos
}

@Component({
  selector: 'app-editar-presupuesto',
  templateUrl: './editar-presupuesto.component.html',
  styleUrls: ['./editar-presupuesto.component.scss'],
})
export class EditarPresupuestoComponent implements OnInit {
  nombrePresupuesto: string = '';
  descripcionPresupuesto: string = '';
  montoPresupuesto: number = 0;
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  emailUsuario: any; // Variable para almacenar el email del usuario logueado
  presupuestoId: string | null = null; // ID del presupuesto a editar
  presupuesto: Presupuesto | null = null; // Usar el tipo Presupuesto

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gastosService: GastosService
  ) {}

  ngOnInit() {
    // Obtener el presupuesto desde el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.presupuesto = navigation.extras.state?.['presupuesto'];
      if (this.presupuesto) {
        this.presupuestoId = this.presupuesto.id;
        this.nombrePresupuesto = this.presupuesto.nombre;
        this.descripcionPresupuesto = this.presupuesto.descripcion;
        this.montoPresupuesto = this.presupuesto.monto;
        this.categoriaSeleccionada = this.presupuesto.categoria;
      }
    }

    // Obtener las categorías
    this.gastosService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias.map(categoria => categoria.nombre); 
    });

    // Obtener el email del usuario logueado
    const usuarioGuardado = localStorage.getItem('usuarioAutenticado');
    this.emailUsuario = usuarioGuardado; // Obtener el email del usuario logueado
  }

  // Función para actualizar el presupuesto
  async editarPresupuesto() {
    if (this.validarFormulario()) {
      const presupuestoEditado = {
        nombre: this.nombrePresupuesto,
        descripcion: this.descripcionPresupuesto,
        monto: this.montoPresupuesto,
        categoria: this.categoriaSeleccionada,
        gastos: []
      };
  
      if (this.presupuestoId) {
        this.gastosService.editarPresupuesto(this.presupuestoId, presupuestoEditado).subscribe(
          (respuesta) => {
            alert('Presupuesto editado con éxito');
            this.router.navigate(['/home']);
          },
          (error) => {
            alert('Error al editar el presupuesto: ' + error.message);
          }
        );
      } else {
        console.log("Presupuesto no encontrado");
      }
    }
  }

  // Validar los datos del formulario
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
