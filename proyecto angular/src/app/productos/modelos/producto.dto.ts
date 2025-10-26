// Ruta: src/app/productos/modelos/producto.dto.ts

/**
 * Data Transfer Object para crear o actualizar un producto.
 * Representa los datos que el backend espera recibir.
 */
export interface ProductoCreateUpdateDTO {
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: number;
  estado: string;
  imagen: string; 
  
  idCategoria: number; 
}