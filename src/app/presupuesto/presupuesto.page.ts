import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit {
  nombrePresupuesto: string = ''; // Inicializamos con un valor por defecto
  gastos: any[] = [];  // Lista de gastos para mostrar

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    const nombre = params.get('nombre');
    this.nombrePresupuesto = nombre ? nombre : 'Presupuesto Desconocido'; // Valor por defecto si es null

    // Aquí puedes cargar la lista de gastos (simulación de datos)
    this.gastos = [
      { descripcion: 'Gasto 1', monto: 500 },
      { descripcion: 'Gasto 2', monto: 300 },
      { descripcion: 'Gasto 3', monto: 200 },
    ];
  }

  // Función para redirigir al Home
  regresar() {
    this.router.navigate(['/home']);
  }
}
