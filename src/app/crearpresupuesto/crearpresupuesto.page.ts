import { Component } from '@angular/core';

@Component({
  selector: 'app-crearpresupuesto',
  templateUrl: './crearpresupuesto.page.html',
  styleUrls: ['./crearpresupuesto.page.scss'],
})
export class CrearpresupuestoPage {
  gasto: any = {
    monto: '',
    fecha: '',
    descripcion: '',
    tipo: '' // Débito o Crédito
  };

  error: boolean = false;

  constructor() {}

  registrarGasto() {
    if (!this.gasto.monto || !this.gasto.fecha || !this.gasto.descripcion || !this.gasto.tipo) {
      this.error = true;
      return;
    }

    this.error = false;
    console.log('Gasto registrado:', this.gasto);
    alert('Gasto registrado exitosamente!');
    // Aquí puedes enviar los datos a un servicio o manejarlos según lo necesites
  }
}
