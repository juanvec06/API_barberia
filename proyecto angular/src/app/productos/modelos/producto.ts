// Ruta: src/app/productos/modelos/producto.ts
import { Categoria } from "../../categorias/modelos/categoria";

export class Producto {
    id!: number;
    nombre!: string;
    descripcion!: string;
    duracion!: string;
    precio!: number;
    imagen!: string;
    estado!: string; 
    objCategoria: Categoria | null = null;
}