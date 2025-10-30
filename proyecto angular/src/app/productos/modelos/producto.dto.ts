/**
 * @file Define el DTO (Data Transfer Object) para la creación y actualización de productos.
 * @description Este archivo contiene la interfaz que modela la estructura de datos
 * que el frontend debe enviar al backend al momento de crear un nuevo producto o
 * actualizar uno existente. Su estructura está alineada con lo que la API del
* backend espera recibir en el cuerpo de las peticiones POST y PUT.
 */

/**
 * Representa el objeto de transferencia de datos para crear o actualizar un producto.
 *
 * Esta interfaz define una estructura de datos optimizada para las operaciones de
 * escritura (creación/actualización). A diferencia del modelo `Producto` que
 * representa los datos tal como se reciben, este DTO modela los datos tal como
 * deben ser enviados, simplificando la carga útil.
 */
export interface ProductoCreateUpdateDTO {
  /**
   * El nombre del servicio.
   */
  nombre: string;

  /**
   * La descripción detallada del servicio.
   */
  descripcion: string;

  /**
   * El precio del servicio como un valor numérico.
   */
  precio: number;

  /**
   * La imagen del servicio, codificada como una cadena en formato Base64.
   * @remarks
   * Puede ser `null` en una operación de actualización si el usuario no
   * desea cambiar la imagen existente.
   */
  imagen: string | null;

  /**
   * La duración del servicio, expresada en minutos como un valor numérico.
   */
  duracionMin: number;

  /**
   * El estado de disponibilidad del servicio.
   * `true` para "Disponible", `false` para "No Disponible".
   */
  estado: boolean;

  /**
   * La referencia a la categoría del producto.
   * @remarks
   * Para las operaciones de creación y actualización, el backend solo necesita
   * el identificador único de la categoría. Por ello, se envía un objeto
   * anidado que contiene únicamente la propiedad `id`.
   */
  objCategoria: {
    id: number;
  };
}