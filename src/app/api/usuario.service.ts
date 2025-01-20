import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private localStorageKey = 'usuarios';

  constructor() {}

  registrarUsuario(user: any): { success: boolean; message: string } {
    // Obtener usuarios existentes desde LocalStorage
    const usuarios = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    // Validar que el correo sea único
    const existeCorreo = usuarios.some((u: any) => u.email === user.email);
    if (existeCorreo) {
      return { success: false, message: 'El correo ya está registrado.' };
    }

    // Agregar el nuevo usuario a la lista
    usuarios.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(usuarios));

    return { success: true, message: 'Usuario registrado con éxito.' };
  }

  // Método adicional para obtener usuarios (si lo necesitas)
  obtenerUsuarios(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }
}
