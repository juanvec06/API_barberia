/**
 * @file Proporciona una fachada para la gestión del estado de las categorías.
 * @description Este servicio implementa el patrón de diseño Facade para simplificar
 * la interacción de los componentes con los datos de las categorías. Centraliza la
 * lógica de obtención de datos y gestiona el estado de forma reactiva, proveyendo
* un stream de datos observable para los componentes de la interfaz de usuario.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from './categoria.service';

/**
 * Servicio Facade que actúa como una API simplificada para la gestión de categorías.
 *
 * Abstrae la comunicación directa con `CategoriaService` y maneja el estado
 * de la lista de categorías, exponiéndolo a través de un Observable (`categorias$`).
 * Los componentes deben usar esta fachada para acceder y solicitar datos de categorías.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaFacadeService {

  /**
   * Fuente de datos privada y mutable para la lista de categorías.
   *
   * Utiliza un `BehaviorSubject` para mantener el último valor emitido y asegurar
   * que los nuevos suscriptores reciban inmediatamente el estado actual.
   * @private
   */
  private categoriasSource = new BehaviorSubject<Categoria[]>([]);

  /**
   * Stream público y de solo lectura del estado de las categorías.
   *
   * Los componentes se suscriben a este `Observable` para recibir actualizaciones
   * reactivas de la lista de categorías cada vez que el estado cambie.
   */
  public categorias$: Observable<Categoria[]> = this.categoriasSource.asObservable();

  /**
   * @param categoriaService El servicio de bajo nivel encargado de las
   * peticiones HTTP para obtener los datos de las categorías.
   */
  constructor(private categoriaService: CategoriaService) { }

  /**
   * Inicia la carga de la lista de categorías desde el backend.
   *
   * Este método invoca a `CategoriaService` para obtener los datos. Una vez
   * recibidos, actualiza el estado interno (`categoriasSource`), lo que provoca
   * que `categorias$` emita la nueva lista a todos los componentes suscritos.
   * Es una operación de "disparar y olvidar" (fire-and-forget) desde la
   * perspectiva del componente que la llama.
   *
   * @returns {void} No devuelve ningún valor.
   */
  public cargarCategorias(): void {
    this.categoriaService.getCategorias().pipe(
      // El operador 'tap' permite ejecutar un efecto secundario (actualizar el BehaviorSubject)
      // sin modificar el stream de datos original.
      tap(categorias => this.categoriasSource.next(categorias))
    ).subscribe();
  }
}