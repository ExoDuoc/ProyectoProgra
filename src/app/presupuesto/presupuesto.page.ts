import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastosService } from '../services/gastos.service'; // Importa el servicio de gastos

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit {
  nombrePresupuesto: string = ''; // Inicializamos con un valor por defecto
  gastos: any[] = []; // Lista de gastos para mostrar
  categorias: string[] = []; // Lista de categorías únicas
  categoriaSeleccionada: string = 'Todas'; // Categoría seleccionada para filtrar

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gastosService: GastosService // Inyecta el servicio de gastos
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    const nombre = params.get('nombre');
    this.nombrePresupuesto = nombre ? nombre : 'Presupuesto Desconocido'; // Valor por defecto si es null

    // Obtiene todos los gastos del servicio
    this.gastos = this.gastosService.obtenerGastos();

    // Obtiene las categorías únicas de los gastos
    this.categorias = [
      'Todas',
      ...new Set(this.gastos.map((gasto) => gasto.categoria)),
    ];
  }

  // Filtrar gastos según la categoría seleccionada
  obtenerGastosFiltrados(): any[] {
    if (this.categoriaSeleccionada === 'Todas') {
      return this.gastos;
    }
    return this.gastos.filter(
      (gasto) => gasto.categoria === this.categoriaSeleccionada
    );
  }

  // Función para redirigir al Home
  regresar() {
    this.router.navigate(['/home']);
  }
}
