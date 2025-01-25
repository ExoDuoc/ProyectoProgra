import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token en el localStorage
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
    return true; // Permite el acceso si está autenticado
  }
}
