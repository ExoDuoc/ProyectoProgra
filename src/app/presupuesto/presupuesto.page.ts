import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit {
  nombrePresupuesto: string = ''; // Inicializamos con un valor por defecto

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    const nombre = params.get('nombre');
    console.log('Nombre del presupuesto:', nombre);  // Verifica en la consola
    this.nombrePresupuesto = nombre ? nombre : 'Presupuesto Desconocido';
  }
}
