// Ruta: src/app/productos/servicios/producto-facade.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Producto } from '../modelos/producto';
import { ProductoService } from './producto.service';
import { ProductoCreateUpdateDTO } from '../modelos/producto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoFacadeService {

  // --- ESTADO PARA LA LISTA DE PRODUCTOS ---
  private productosSource = new BehaviorSubject<Producto[]>([]);
  public productos$: Observable<Producto[]> = this.productosSource.asObservable();

  // --- ESTADO PARA EL PRODUCTO SELECCIONADO ---
  private selectedProductSource = new BehaviorSubject<Producto | null>(null);
  public selectedProduct$: Observable<Producto | null> = this.selectedProductSource.asObservable();

  // Inyectamos el servicio de bajo nivel
  constructor(private productoService: ProductoService) { }

  /**
   * Pide al ProductoService que cargue la lista de productos
   * y actualiza el estado interno de la fachada.
   */
  public cargarProductos(): void {
    this.productoService.getProductos().pipe(
      tap(productos => this.productosSource.next(productos)) // 'tap' nos permite ejecutar una acción sin modificar el flujo.
    ).subscribe(); // Nos suscribimos para que la petición HTTP se ejecute.
  }

  /**
   * Transforma los datos del formulario a un DTO y pide al servicio que cree el producto.
   * Si tiene éxito, vuelve a cargar la lista completa para mantenerla sincronizada.
   * @param productoFormData Los datos crudos del FormGroup.
   */
  public crearProducto(productoFormData: any): void {
    const productoDTO: ProductoCreateUpdateDTO = {
      ...productoFormData,
      idCategoria: productoFormData.objCategoria.id // Transformamos el objeto Categoria a solo el ID.
    };

    this.productoService.create(productoDTO).pipe(
      tap(() => this.cargarProductos()) // Si la creación tiene éxito, recargamos la lista.
    ).subscribe();
  }

  /**
   * Transforma los datos del formulario a un DTO y pide al servicio que actualice el producto.
   * Si tiene éxito, vuelve a cargar la lista completa.
   * @param id El ID del producto a actualizar.
   * @param productoFormData Los datos crudos del FormGroup.
   */
  public actualizarProducto(id: number, productoFormData: any): void {
    const productoDTO: ProductoCreateUpdateDTO = {
      ...productoFormData,
      idCategoria: productoFormData.objCategoria.id
    };

    this.productoService.update(id, productoDTO).pipe(
      tap(() => this.cargarProductos()) // Recargamos la lista tras el éxito.
    ).subscribe();
  }

  /**
   * Pide al servicio que elimine un producto.
   * Si tiene éxito, actualiza el estado localmente para una respuesta visual más rápida.
   * @param id El ID del producto a eliminar.
   */
  public eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        // Éxito: Actualizamos el estado local eliminando el producto.
        const productosActuales = this.productosSource.getValue();
        const productosFiltrados = productosActuales.filter(p => p.id !== id);
        this.productosSource.next(productosFiltrados);
      },
    });
  }
  /**
  * Pide al ProductoService los datos de un único producto por su ID
  * y actualiza el estado 'selectedProductSource'.
  * @param id El ID del producto a cargar.
  */
  public cargarProductoSeleccionado(id: number): void {
    this.productoService.getProductoById(id).pipe(
      tap(producto => this.selectedProductSource.next(producto))
    ).subscribe();
  }
}