/**
 * @file Contiene el servicio para la comunicación con el API de productos.
 * @description Este archivo define `ProductoService`, la capa de acceso a datos
 * responsable de realizar todas las peticiones HTTP (CRUD) al endpoint del
 * backend que gestiona los productos/servicios. Incluye un manejo de errores
 * centralizado para las peticiones.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Producto } from '../modelos/producto';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoCreateUpdateDTO } from '../modelos/producto.dto';

/**
 * Servicio de bajo nivel para interactuar con la API de productos.
 *
 * Se encarga exclusivamente de las operaciones CRUD relacionadas con los productos,
 * utilizando `HttpClient` para comunicarse con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /**
   * Cabeceras HTTP estándar para las peticiones POST, PUT y DELETE.
   * @private
   */
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * URL base del endpoint de la API para los recursos de productos.
   * @private
   */
  private urlEndPoint: string = 'http://localhost:5000/api/productos';

  /**
   * @param http El cliente HTTP de Angular, inyectado para realizar peticiones web.
   */
  constructor(private http: HttpClient) { }

  /**
   * Realiza una petición GET para obtener la lista completa de productos.
   *
   * @returns Un `Observable` que emite un arreglo de `Producto`.
   */
  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  /**
   * Realiza una petición POST para crear un nuevo producto en el backend.
   *
   * @param productoDTO El DTO que contiene los datos del producto a crear.
   * @returns Un `Observable` que emite el objeto `Producto` recién creado.
   */
  public create(productoDTO: ProductoCreateUpdateDTO): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, productoDTO, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición PUT para actualizar un producto existente.
   *
   * @param id El ID del producto a actualizar.
   * @param productoDTO El DTO con los datos actualizados del producto.
   * @returns Un `Observable` que emite el objeto `Producto` actualizado.
   */
  public update(id: number, productoDTO: ProductoCreateUpdateDTO): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndPoint}/${id}`, productoDTO, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición DELETE para eliminar un producto del backend.
   *
   * @param id El ID del producto a eliminar.
   * @returns Un `Observable` de tipo `void` que se completa cuando la operación finaliza.
   */
  public deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición GET para obtener un único producto por su ID.
   *
   * @param id El ID del producto a obtener.
   * @returns Un `Observable` que emite el objeto `Producto` encontrado.
   */
  public getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejador de errores centralizado para todas las peticiones HTTP del servicio.
   * Captura `HttpErrorResponse`, muestra una notificación al usuario con SweetAlert2
   * para errores conocidos (400, 404) y relanza el error como un observable.
   *
   * @param error El objeto de error HTTP capturado.
   * @returns Un `Observable` que emite un error, para ser manejado por el suscriptor.
   * @private
   */
  private handleError(error: HttpErrorResponse) {
    console.error("Ocurrió un error en la petición HTTP:", error);
    if (error.status === 400 || error.status === 404) {
      const mensajeError = error.error.mensaje || 'Error de validación o recurso no encontrado.';
      console.error(`Error ${error.status}: ${mensajeError}`);
      Swal.fire({ icon: 'error', title: '¡Error!', text: mensajeError, confirmButtonText: 'Cerrar' });
      return throwError(() => new Error(mensajeError));
    } else {
      return throwError(() => new Error('Ocurrió un error inesperado. Por favor, intente más tarde.'));
    }
  }
}