import { Categoria } from "../../categorias/modelos/categoria";

export class Producto {
    id!: number;
    nombre!: string;
    descripcion!: string;
    precio!: number;
    imagen!: string;
    duracionMin!: number; // CAMBIO: de 'duracion' (string) a 'duracionMin' (number)
    estado!: boolean;      // CAMBIO: de string a boolean
    objCategoria!: Categoria; // CAMBIO: Ya no es nulo, el backend siempre lo devuelve
}