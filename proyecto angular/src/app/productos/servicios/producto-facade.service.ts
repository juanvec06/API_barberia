/**
 * @file Proporciona una fachada para la gestión del estado de los productos.
 * @description Este servicio aplica el patrón Facade para centralizar y simplificar
 * la interacción de los componentes con la lógica de negocio y el estado de los
 * productos. Maneja dos piezas de estado: la lista completa de productos y el
 * producto actualmente seleccionado para edición.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Producto } from '../modelos/producto';
import { ProductoService } from './producto.service';
import { ProductoCreateUpdateDTO } from '../modelos/producto.dto';

/**
 * Servicio Facade que actúa como una API de alto nivel para la gestión de productos.
 *
 * Abstrae las llamadas directas a `ProductoService` y gestiona el estado
 * reactivo de los productos. Proporciona a los componentes observables para
 * suscribirse a los cambios en los datos y métodos simplificados para realizar
 * operaciones como crear, actualizar, eliminar y cargar productos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoFacadeService {

  /**
   * Fuente de datos privada para la lista completa de productos.
   * Utiliza `BehaviorSubject` para mantener y emitir el estado actual.
   * @private
   */
  private productosSource = new BehaviorSubject<Producto[]>([]);

  /**
   * Observable público que emite la lista de productos.
   * Los componentes se suscriben a este stream para recibir la lista actualizada.
   */
  public productos$: Observable<Producto[]> = this.productosSource.asObservable();

  /**
   * Fuente de datos privada para el producto seleccionado (para edición).
   * Puede emitir un objeto `Producto` o `null`.
   * @private
   */
  private selectedProductSource = new BehaviorSubject<Producto | null>(null);

  /**
   * Observable público que emite el producto actualmente seleccionado.
   */
  public selectedProduct$: Observable<Producto | null> = this.selectedProductSource.asObservable();

  /**
   * @param productoService El servicio de bajo nivel para las peticiones HTTP de productos.
   */
  constructor(private productoService: ProductoService) { }

  /**
   * Solicita la carga de la lista completa de productos desde el backend.
   * Al recibir los datos, actualiza el estado `productosSource`, notificando
   * a todos los suscriptores de `productos$`.
   */
  public cargarProductos(): void {
    this.productoService.getProductos().pipe(
      tap(productos => this.productosSource.next(productos))
    ).subscribe();
  }

  /**
   * Procesa y envía los datos para la creación de un nuevo producto.
   * Transforma los datos crudos del formulario en un `ProductoCreateUpdateDTO`
   * antes de pasarlos al servicio. Si la operación es exitosa, refresca la
   * lista de productos para mantener el estado sincronizado.
   *
   * @param productoFormData Objeto con los valores del `FormGroup` del formulario de creación.
   */
  public crearProducto(productoFormData: any): void {
    // Extrae la cadena Base64 pura de la imagen, eliminando el prefijo 'data:image/...;base64,'.
    const imagenPuraBase64 = productoFormData.imagen
      ? (productoFormData.imagen as string).split(',')[1]
      : null;

    // Construye el DTO con la estructura que espera el backend.
    const productoDTO: ProductoCreateUpdateDTO = {
      nombre: productoFormData.nombre,
      descripcion: productoFormData.descripcion,
      precio: productoFormData.precio,
      imagen: imagenPuraBase64,
      duracionMin: Number(productoFormData.duracion), // Asegura que sea un número.
      estado: productoFormData.estado === 'Disponible', // Convierte el string a booleano.
      objCategoria: { id: productoFormData.objCategoria.id } // Envía solo el ID de la categoría.
    };

    this.productoService.create(productoDTO).pipe(
      // Después de crear, recarga la lista para que la vista se actualice.
      tap(() => this.cargarProductos())
    ).subscribe();
  }

  /**
   * Procesa y envía los datos para la actualización de un producto existente.
   * Transforma los datos del formulario en un DTO y, si la operación tiene éxito,
   * refresca la lista de productos.
   *
   * @param id El ID del producto a actualizar.
   * @param productoFormData Objeto con los valores del `FormGroup` del formulario de actualización.
   */
  public actualizarProducto(id: number, productoFormData: any): void {
    const imagenPuraBase64 = productoFormData.imagen
      ? (productoFormData.imagen as string).split(',')[1]
      : null;

    const productoDTO: ProductoCreateUpdateDTO = {
      nombre: productoFormData.nombre,
      descripcion: productoFormData.descripcion,
      precio: productoFormData.precio,
      imagen: imagenPuraBase64,
      duracionMin: Number(productoFormData.duracion),
      estado: productoFormData.estado === 'Disponible',
      objCategoria: { id: productoFormData.objCategoria.id }
    };

    this.productoService.update(id, productoDTO).pipe(
      tap(() => this.cargarProductos())
    ).subscribe();
  }

  /**
   * Solicita la eliminación de un producto por su ID.
   * Tras una eliminación exitosa en el backend, actualiza el estado local
   * (`productosSource`) de forma optimista para una respuesta visual inmediata,
   * eliminando el producto de la lista sin esperar una recarga completa.
   *
   * @param id El ID del producto a eliminar.
   */
  public eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        const productosActuales = this.productosSource.getValue();
        const productosFiltrados = productosActuales.filter(p => p.id !== id);
        this.productosSource.next(productosFiltrados);
      },
    });
  }

  /**
   * Carga los datos de un único producto por su ID y lo establece como el
   * producto seleccionado en el estado de la fachada.
   *
   * @param id El ID del producto a cargar.
   */
  public cargarProductoSeleccionado(id: number): void {
    this.productoService.getProductoById(id).pipe(
      tap(producto => this.selectedProductSource.next(producto))
    ).subscribe();
  }
}