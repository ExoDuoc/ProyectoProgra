import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    tipo: '', // Débito o Crédito
    cuotas: null // Solo para Crédito
  };

  error: boolean = false;
  gastos: any[] = []; // Lista de gastos generados

  constructor(private router: Router) {}

  onTipoChange() {
    if (this.gasto.tipo === 'debito') {
      this.gasto.cuotas = null; // Resetear cuotas si es Débito
    }
  }

  registrarGasto() {
    if (!this.gasto.monto || !this.gasto.fecha || !this.gasto.descripcion || !this.gasto.tipo) {
      this.error = true;
      return;
    }

    if (this.gasto.tipo === 'credito' && !this.gasto.cuotas) {
      this.error = true;
      return;
    }

    this.error = false;

    if (this.gasto.tipo === 'debito') {
      this.gastos.push({
        monto: this.gasto.monto,
        fecha: this.gasto.fecha,
        descripcion: this.gasto.descripcion,
      });
    }

    if (this.gasto.tipo === 'credito') {
      const montoPorCuota = this.gasto.monto / this.gasto.cuotas;
      const fechaBase = new Date(this.gasto.fecha);

      for (let i = 0; i < this.gasto.cuotas; i++) {
        const nuevaFecha = new Date(fechaBase);
        nuevaFecha.setMonth(fechaBase.getMonth() + i);

        this.gastos.push({
          monto: montoPorCuota.toFixed(2),
          fecha: nuevaFecha.toISOString().split('T')[0],
          descripcion: `${this.gasto.descripcion} (Cuota ${i + 1})`,
        });
      }
    }

    console.log('Gastos registrados:', this.gastos);
    alert('Gasto(s) registrado(s) exitosamente!');
  }

  regresarAlHome() {
    this.router.navigate(['/home']);
  }
}
