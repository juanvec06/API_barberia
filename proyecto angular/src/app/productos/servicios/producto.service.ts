// Ruta: src/app/productos/servicios/producto.service.ts 
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Producto } from '../modelos/producto';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoCreateUpdateDTO } from '../modelos/producto.dto'; // <-- 1. IMPORTAMOS EL DTO

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPoint: string = 'http://localhost:5000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    console.log("Listando productos desde el servicio");
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  create(productoDTO: ProductoCreateUpdateDTO): Observable<Producto> {
    console.log("Creando desde el servicio con DTO:", productoDTO);
    return this.http.post<Producto>(this.urlEndPoint, productoDTO, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  // Recibe el ID para la URL y el DTO para el cuerpo de la petición.
  update(id: number, productoDTO: ProductoCreateUpdateDTO): Observable<Producto> {
    console.log(`Actualizando producto ${id} desde el servicio con DTO:`, productoDTO);
    return this.http.put<Producto>(`${this.urlEndPoint}/${id}`, productoDTO, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProducto(id: number): Observable<void> {
    console.log("Eliminando producto desde el servicio");
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  getProductoById(id: number): Observable<Producto> {
    console.log("Obteniendo producto con ID:", id);
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Ocurrió un error en la petición HTTP:", error);
    if (error.status === 400 || error.status === 404) {
      const mensajeError = error.error.mensaje || 'Error de validación.';
      console.error(`Error ${error.status}: ${mensajeError}`);
      Swal.fire({ icon: 'error', title: '¡Error!', text: mensajeError, confirmButtonText: 'Cerrar' });
      return throwError(() => new Error(mensajeError));
    } else {
      return throwError(() => new Error('Ocurrió un error inesperado.'));
    }
  }
}