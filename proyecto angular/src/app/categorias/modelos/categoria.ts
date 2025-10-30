/**
 * @file Define el modelo de datos para una Categoría.
 * @description Este archivo contiene la interfaz que representa la estructura
 * de un objeto de categoría, tal como se recibe desde el backend y se utiliza
 * en todo el frontend de la aplicación.
 */

/**
 * Representa la estructura de una categoría de servicio.
 * 
 * Esta interfaz define el contrato de datos para una categoría, asegurando
 * que cualquier objeto que la implemente tenga un identificador numérico
 * y un nombre.
 */
export interface Categoria {
  /**
   * El identificador único de la categoría.
   * @remarks
   * Generalmente corresponde a la clave primaria en la base de datos del backend.
   */
  id: number;

  /**
   * El nombre visible y descriptivo de la categoría.
   * @example "Cortes Cabello"
   * @example "Tratamiento Capilar"
   */
  nombre: string;
}