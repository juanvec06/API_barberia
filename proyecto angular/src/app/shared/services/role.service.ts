/**
 * @file Contiene el servicio para la gestión del rol del usuario.
 * @description Este archivo define `RoleService`, un servicio de estado que
 * simula la autenticación y gestiona el rol actual del usuario en la aplicación
 * (Comprador o Administrador). Permite cambiar de rol y redirige al usuario
 * a la vista correspondiente.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * Define los roles de usuario permitidos en la aplicación.
 * El uso de un tipo de unión de literales (`'Comprador' | 'Administrador'`)
 * proporciona seguridad de tipos y previene errores de tipeo al asignar o
 * comparar roles.
 */
export type UserRole = 'Comprador' | 'Administrador';

/**
 * Servicio para gestionar el estado del rol del usuario.
 *
 * Mantiene el rol actual y proporciona un método para alternar entre los roles
 * disponibles. Los componentes pueden suscribirse a `currentUserRole$` para
 * reaccionar a los cambios de rol. Este servicio es una implementación simple
 * de gestión de estado para simular la vista de diferentes tipos de usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  /**
   * Fuente de estado privada y mutable para el rol del usuario.
   *
   * Se inicializa con el rol 'Comprador' por defecto. `BehaviorSubject`
   * se utiliza para que cualquier componente que se suscriba reciba
   * inmediatamente el rol actual.
   * @private
   */
  private role$ = new BehaviorSubject<UserRole>('Comprador');

  /**
   * Stream público y de solo lectura del rol del usuario actual.
   * Los componentes se suscriben a este Observable para recibir notificaciones
   * cuando el rol del usuario cambia.
   */
  public currentUserRole$ = this.role$.asObservable();

  /**
   * @param router El servicio de enrutamiento de Angular, utilizado para
   * redirigir al usuario después de un cambio de rol.
   */
  constructor(private router: Router) { }

  /**
   * Alterna el rol del usuario entre 'Comprador' y 'Administrador'.
   *
   * Este método lee el rol actual, lo cambia al rol opuesto, emite el nuevo
   * valor a todos los suscriptores y, como efecto secundario, navega a la
   * ruta principal correspondiente al nuevo rol.
   *
   * @returns {void}
   */
  public toggleRole(): void {
    const currentRole = this.role$.getValue();
    const newRole: UserRole = currentRole === 'Comprador' ? 'Administrador' : 'Comprador';

    // Emite el nuevo rol a través del BehaviorSubject.
    this.role$.next(newRole);

    // Redirige al usuario a la vista adecuada.
    if (newRole === 'Administrador') {
      this.router.navigate(['/listarProducto']);
    } else {
      this.router.navigate(['/verCategorias']);
    }

    console.log(`Rol cambiado a: ${newRole}`);
  }
}