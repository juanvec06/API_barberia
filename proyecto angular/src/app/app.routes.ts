// Ruta: src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importaciones de los componentes de la aplicación
import { ProductosComponent } from './productos/listarProductos/productos.component';
import { FormCrearComponent } from './productos/crearProductos/form-crear.component';
import { FormActualizarComponent } from './productos/actualizarProductos/form-actualizar.component';
import { VerProductosPorCategoriasComponent } from './ver-productos-por-categorias/ver-productos-por-categorias.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { CuponesComponent } from './cupones/cupones.component';
import { AyudaComponent } from './ayuda/ayuda.component';

export const routes: Routes = [
    // Rutas de Administrador (gestión de productos)
    { path: 'listarProducto', component: ProductosComponent },
    { path: 'registrarProducto', component: FormCrearComponent },
    { path: 'actualizarProducto/:id', component: FormActualizarComponent },

    // Ruta principal del Cliente (catálogo de productos/servicios)
    { path: 'verCategorias', component: VerProductosPorCategoriasComponent },

    // Rutas para las páginas "En Construcción"
    { path: 'ofertas', component: OfertasComponent },
    { path: 'cupones', component: CuponesComponent },
    { path: 'ayuda', component: AyudaComponent },

    // Redirección por defecto a la página principal de la tienda
    { path: '', redirectTo: '/verCategorias', pathMatch: 'full' },

    // Ruta para manejar URLs no encontradas
    { path: '**', redirectTo: '/verCategorias', pathMatch: 'full' }
];