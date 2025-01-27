import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GastosService } from '../services/gastos.service'; // Importa el servicio de gastos

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
    categoria: '', // Nueva propiedad para la categoría
    cuotas: null, // Solo para Crédito
  };
  isModalOpen: boolean = false;  // Para controlar el estado del modal



  gastos: any[] = []; // Lista de gastos registrados
  gastosFiltrados: any[] = [...this.gastos]; // Inicialmente muestra todos los gastos
  searchTerm: string = ''; // Almacena el término de búsqueda

  error: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private gastosService: GastosService // Inyecta el servicio
  ) {}

  abrirModalFotoBoleta() {
    this.isModalOpen = true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.isModalOpen = false;
  }

  // Simular la acción de arrastrar o usar cámara
  simularAccion(accion: string) {
    if (accion === 'arrastrar') {
      console.log('Simulando arrastre de archivo...');
    } else if (accion === 'camara') {
      console.log('Simulando uso de cámara...');
    }
    this.cerrarModal(); // Cierra el modal después de hacer clic
  }
  filtrarGastos() {
    this.gastosFiltrados = this.gastos.filter(gasto =>
      gasto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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
    // Verifica si algún campo está vacío
    if (!this.gasto.monto || !this.gasto.fecha || !this.gasto.descripcion || !this.gasto.tipo || !this.gasto.categoria) {
      this.error = true;
      this.mostrarToast('Por favor completa todos los campos obligatorios.', 'danger');
      return;
    }

    // Validación para Crédito (si no se ingresan cuotas)
    if (this.gasto.tipo === 'credito' && !this.gasto.cuotas) {
      this.error = true;
      this.mostrarToast('Por favor ingresa el número de cuotas.', 'danger');
      return;
    }

    this.error = false; // Restablecer estado de error

    // Si es Débito, agregar el gasto
    if (this.gasto.tipo === 'debito') {
      this.gastosService.agregarGasto({
        monto: this.gasto.monto,
        fecha: this.gasto.fecha,
        descripcion: this.gasto.descripcion,
        categoria: this.gasto.categoria,
        tipo: 'Débito',
      });
      this.gastos.push({ ...this.gasto, tipo: 'Débito' });
    }

    // Si es Crédito, agregar las cuotas
    if (this.gasto.tipo === 'credito') {
      const montoPorCuota = this.gasto.monto / this.gasto.cuotas;
      const fechaBase = new Date(this.gasto.fecha);

      for (let i = 0; i < this.gasto.cuotas; i++) {
        const nuevaFecha = new Date(fechaBase);
        nuevaFecha.setMonth(fechaBase.getMonth() + i);

        const gastoCredito = {
          monto: montoPorCuota.toFixed(2),
          fecha: nuevaFecha.toISOString().split('T')[0],
          descripcion: `${this.gasto.descripcion} (Cuota ${i + 1})`,
          categoria: this.gasto.categoria,
          tipo: 'Crédito',
        };

        this.gastosService.agregarGasto(gastoCredito);
        this.gastos.push(gastoCredito);
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
      categoria: '',
      cuotas: null,
    };
  }

  // Función para regresar al home
  regresarAlHome() {
    this.router.navigate(['/home']);
  }

  // Función para editar un gasto
  editarGasto(index: number) {
    const gastoEditado = this.gastos[index];
    this.gasto = { ...gastoEditado }; // Rellenar el formulario con los datos del gasto seleccionado
    this.gastos.splice(index, 1); // Eliminar el gasto de la lista para que pueda ser editado
  }

  // Función para eliminar un gasto
  eliminarGasto(index: number) {
    this.gastos.splice(index, 1); // Eliminar el gasto de la lista
    this.mostrarToast('Gasto eliminado exitosamente.', 'success');
  }
}
