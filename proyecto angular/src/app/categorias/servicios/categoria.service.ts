/**
 * @file Contiene el servicio para la comunicación con el API de categorías.
 * @description Este archivo define `CategoriaService`, responsable de realizar
 * las peticiones HTTP al endpoint del backend que gestiona los datos de las
 * categorías. Actúa como la capa de acceso a datos para todo lo relacionado
 * con las categorías.
 */

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Categoria } from "../modelos/categoria";
import { Observable } from "rxjs";

/**
 * Servicio de bajo nivel para interactuar con la API de categorías.
 *
 * Se encarga exclusivamente de las operaciones CRUD (en este caso, solo lectura)
 * relacionadas con las categorías, comunicándose directamente con el backend a través
 * del módulo `HttpClient` de Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  /**
   * Cabeceras HTTP que se enviarán en las peticiones.
   * @private
   */
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * La URL base del endpoint de la API para los recursos de categorías.
   * @private
   */
  private urlEndPoint: string = 'http://localhost:5000/api/categorias';

  /**
   * @param http El cliente HTTP de Angular, inyectado para realizar peticiones web.
   */
  constructor(private http: HttpClient) { }

  /**
   * Realiza una petición GET al backend para obtener la lista completa de categorías.
   *
   * @returns Un `Observable` que emite un arreglo de objetos `Categoria`
   * cuando la petición HTTP es exitosa. Los servicios de más alto nivel,
   * como la fachada, se suscriben a este observable para recibir los datos.
   */
  getCategorias(): Observable<Categoria[]> {
    console.log("Listando categorias desde el servicio");
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }
}