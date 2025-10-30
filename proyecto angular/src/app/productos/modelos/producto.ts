/**
 * @file Define el modelo de datos para un Producto/Servicio.
 * @description Este archivo contiene la clase que representa la estructura de un
 * objeto de producto, tal como se recibe desde el backend. Este modelo es
 * utilizado en toda la aplicación para tipar los datos de los servicios.
 */

import { Categoria } from "../../categorias/modelos/categoria";

/**
 * Representa la estructura de un servicio ofrecido en la barbería.
 *
 * Esta clase define el contrato de datos para un producto, detallando
 * todas las propiedades que lo componen, desde su identificador único
 * hasta la categoría a la que pertenece.
 */
export class Producto {
    /**
     * El identificador único del producto.
     * @remarks
     * Corresponde a la clave primaria en la base de datos del backend.
     */
    id!: number;

    /**
     * El nombre comercial del servicio.
     * @example "Corte Fade"
     */
    nombre!: string;

    /**
     * Una descripción detallada de lo que incluye el servicio.
     */
    descripcion!: string;

    /**
     * El precio del servicio.
     * @remarks
     * Se almacena como un número para facilitar cálculos y formateo.
     */
    precio!: number;

    /**
     * La URL o la cadena que representa la imagen del servicio.
     * @remarks
     * El backend devuelve una URL completa, y el frontend la utiliza directamente
     * en las etiquetas `<img>`.
     */
    imagen!: string;

    /**
     * La duración del servicio, expresada en minutos.
     * @remarks
     * El tipo de dato es `number` para facilitar conversiones o cálculos.
     */
    duracionMin!: number;

    /**
     * El estado de disponibilidad del servicio.
     * @remarks
     * Es un valor booleano donde `true` significa "Disponible" y `false`
     * significa "No Disponible". 
     */
    estado!: boolean;

    /**
     * El objeto de la categoría a la que pertenece el servicio.
     * @remarks
     * Contiene el `id` y el `nombre` de la categoría. Se asume que esta
     * propiedad siempre será provista por el backend.
     */
    objCategoria!: Categoria;
}