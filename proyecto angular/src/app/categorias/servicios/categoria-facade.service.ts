// Ruta: src/app/categorias/servicios/categoria-facade.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from './categoria.service'; 
@Injectable({
  providedIn: 'root'
})
export class CategoriaFacadeService {

  // Estado privado para las categorías 
  private categoriasSource = new BehaviorSubject<Categoria[]>([]);
  // Estado público expuesto como Observable
  public categorias$: Observable<Categoria[]> = this.categoriasSource.asObservable();

  constructor(private categoriaService: CategoriaService) { }

  /**
   * Pide al CategoriaService que cargue la lista de categorías
   * y actualiza el estado interno de la fachada.
   */
  public cargarCategorias(): void {
    this.categoriaService.getCategorias().pipe(
      tap(categorias => this.categoriasSource.next(categorias))
    ).subscribe();
  }
}