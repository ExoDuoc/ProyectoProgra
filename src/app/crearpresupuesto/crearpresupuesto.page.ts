import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    cuotas: null, // Solo para Crédito
  };

  error: boolean = false;
  gastos: any[] = []; // Lista de gastos generados

  constructor(private router: Router, private toastController: ToastController) {}

  onTipoChange() {
    if (this.gasto.tipo === 'debito') {
      this.gasto.cuotas = null; // Resetear cuotas si es Débito
    }
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  registrarGasto() {
    if (!this.gasto.monto || !this.gasto.fecha || !this.gasto.descripcion || !this.gasto.tipo) {
      this.error = true;
      this.mostrarToast('Por favor completa todos los campos obligatorios.', 'danger');
      return;
    }

    if (this.gasto.tipo === 'credito' && !this.gasto.cuotas) {
      this.error = true;
      this.mostrarToast('Por favor ingresa el número de cuotas.', 'danger');
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

    this.mostrarToast('Gasto(s) registrado(s) exitosamente!', 'success');
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.gasto = {
      monto: '',
      fecha: '',
      descripcion: '',
      tipo: '',
      cuotas: null,
    };
  }

  editarGasto(index: number) {
    this.gasto = { ...this.gastos[index] }; // Copia los datos del gasto a editar
    this.gastos.splice(index, 1); // Elimina temporalmente el gasto de la lista
  }

  eliminarGasto(index: number) {
    this.gastos.splice(index, 1); // Elimina el gasto de la lista
    this.mostrarToast('Gasto eliminado exitosamente.', 'success');
  }

  regresarAlHome() {
    this.router.navigate(['/home']);
  }
}
