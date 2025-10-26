// Ruta: src/app/shared/services/role.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Definimos un tipo para los roles para evitar errores de tipeo.
export type UserRole = 'Comprador' | 'Administrador';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // Usamos un BehaviorSubject para mantener el estado del rol actual.
  // Inicia como 'Comprador' por defecto.
  // BehaviorSubject es ideal porque emite el último valor a los nuevos suscriptores.
  private role$ = new BehaviorSubject<UserRole>('Comprador');

  // Exponemos el rol como un Observable público para que los componentes puedan suscribirse.
  public currentUserRole$ = this.role$.asObservable();

  constructor(private router: Router) { }

  // Método para cambiar el rol
  public toggleRole(): void {
    // Obtenemos el valor actual
    const currentRole = this.role$.getValue();
    
    // Cambiamos al rol opuesto
    const newRole: UserRole = currentRole === 'Comprador' ? 'Administrador' : 'Comprador';

    // Emitimos el nuevo rol a todos los suscriptores
    this.role$.next(newRole);

    // Redirigimos al usuario a la página correspondiente al nuevo rol
    if (newRole === 'Administrador') {
      this.router.navigate(['/listarProducto']);
    } else {
      this.router.navigate(['/verCategorias']);
    }

    console.log(`Rol cambiado a: ${newRole}`);
  }
}