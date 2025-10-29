// Ruta: src/app/productos/modelos/producto.dto.ts

/**
 * Data Transfer Object para crear o actualizar un producto.
 * Representa los datos que el backend espera recibir.
 */
export interface ProductoCreateUpdateDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string | null; // Puede ser string (Base64) o null si no se cambia
  duracionMin: number; // CAMBIO: nombre y tipo
  estado: boolean;      // CAMBIO: tipo
  objCategoria: {
    id: number;
  };
}