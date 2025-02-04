import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Asegúrate de que el JSON Server está corriendo en este puerto

  constructor(private http: HttpClient) {}

  // Verifica si un usuario con el correo dado ya existe
  verificarUsuario(email: string): Observable<any[]> {
    const url = `${this.apiUrl}?email=${email}`; // Filtra usuarios por email
    return this.http.get<any[]>(url);
  }

  obtenerPresupuestos(email: string): Observable<any[]> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any[]>(url);
  }

  
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  validarUsuario(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  // Registra un nuevo usuario
  registrarUsuario(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
