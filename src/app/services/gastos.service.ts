import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Asegúrate de importar switchMap

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private urlPresupuestos = 'http://localhost:3000/presupuestos'; // URL para los presupuestos
  private urlCategorias = 'http://localhost:3000/categorias'; // URL para las categorías
  private apiUrl = 'http://localhost:3000/usuarios'; // Asegúrate de que la URL apunte al servidor de JSON Server

  constructor(private http: HttpClient) {}

  // Método para obtener todos los gastos de un presupuesto
  obtenerGastos(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPresupuestos);
  }

  // Método para agregar un nuevo gasto (puede ser cualquier gasto relacionado con un presupuesto)
  agregarGasto(gasto: any) {
    // Aquí puedes enviar el nuevo gasto al servidor y asociarlo al presupuesto
    return this.http.post(this.urlPresupuestos, gasto);
  }

  // Método para obtener todas las categorías
  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.urlCategorias);
  }

  // Método para agregar una nueva categoría
  agregarCategoria(nuevaCategoria: string): Observable<any> {
    const categoria = { nombre: nuevaCategoria };
    return this.http.post(this.urlCategorias, categoria);
  }


  guardarPresupuesto(presupuesto: any, emailUsuario: string): Observable<any> {
    // Primero, obtener el usuario por email
    return this.http.get<any[]>(`${this.apiUrl}?email=${emailUsuario}`).pipe(
      switchMap((usuarios: any[]) => {
        if (usuarios.length > 0) {
          // Si el usuario existe, agregar el presupuesto
          const usuario = usuarios[0];
          usuario.presupuestos.push(presupuesto); // Agregamos el nuevo presupuesto

          // Actualizamos el usuario con el nuevo presupuesto
          return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario);
        } else {
          throw new Error('Usuario no encontrado');
        }
      })
    );
  }
}
