import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Presupuesto {
  nombre: string;
  descripcion: string;
  monto: number;
  categoria: string;
  gastos: any[]; // Puedes especificar una estructura más detallada para los gastos
}

@Component({
  selector: 'app-ver-presupuesto',
  templateUrl: './ver-presupuesto.component.html',
  styleUrls: ['./ver-presupuesto.component.scss'],
})
export class VerPresupuestoComponent  implements OnInit {

  presupuesto: Presupuesto | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Acceder a los datos pasados mediante state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['presupuesto']) {
      this.presupuesto = navigation.extras.state['presupuesto'];
    }
  }

  volver(){
    this.router.navigate(['/home']);
  }
}
