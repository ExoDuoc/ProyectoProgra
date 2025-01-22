import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private gastos: any[] = [];

  constructor() {
    // Cargar los gastos desde el localStorage si existen
    const storedGastos = localStorage.getItem('gastos');
    if (storedGastos) {
      this.gastos = JSON.parse(storedGastos);
    }
  }

  // Método para agregar un nuevo gasto
  agregarGasto(gasto: any) {
    this.gastos.push(gasto);
    this.guardarGastos(); // Guardar los cambios en localStorage
  }

  // Método para obtener todos los gastos
  obtenerGastos() {
    return this.gastos;
  }

  // Método para obtener gastos por categoría
  obtenerGastosPorCategoria(categoria: string) {
    return this.gastos.filter(gasto => gasto.categoria === categoria);
  }

  // Método para guardar los gastos en localStorage
  guardarGastos() {
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
  }
}
