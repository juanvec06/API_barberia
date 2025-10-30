/**
 * @file Contiene la lógica para el componente de visualización de productos por categorías.
 * @description Este componente es la vista principal para el rol "Comprador". Muestra
 * una barra lateral con las categorías disponibles y una cuadrícula con los productos
 * que pertenecen a la categoría seleccionada.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../categorias/modelos/categoria';
import { Producto } from '../productos/modelos/producto';
import { ProductoFacadeService } from '../productos/servicios/producto-facade.service';
import { CategoriaFacadeService } from '../categorias/servicios/categoria-facade.service';

/**
 * Componente que renderiza la vista de "Nuestros Servicios" para el cliente.
 *
 * Se encarga de obtener la lista de productos y categorías a través de sus
 * respectivas fachadas. Implementa la lógica de filtrado para mostrar
 * únicamente los productos que corresponden a la categoría que el usuario
 * ha seleccionado en la barra lateral.
 */
@Component({
  selector: 'app-ver-productos-por-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-productos-por-categorias.component.html',
  styleUrl: './ver-productos-por-categorias.component.css'
})
export class VerProductosPorCategoriasComponent implements OnInit {

  /**
   * Almacena la lista completa y sin filtrar de todos los productos.
   * Actúa como la fuente de datos maestra para las operaciones de filtrado.
   * @private
   */
  private allProducts: Producto[] = [];

  /**
   * Almacena la lista de productos que se muestra actualmente en la vista.
   * Su contenido es el resultado de filtrar `allProducts` según la categoría
   * seleccionada. Esta es la propiedad que se enlaza en el `*ngFor` de la plantilla.
   */
  public filteredProducts: Producto[] = [];

  /**
   * Almacena la lista de categorías que se muestra en la barra lateral.
   */
  public categorias: Categoria[] = [];

  /**
   * Mantiene el ID de la categoría actualmente seleccionada por el usuario.
   * Su valor es `null` cuando se selecciona "Todas las categorías".
   */
  public selectedCategoryId: number | null = null;

  /**
   * @param productoFacade Fachada para la gestión del estado de los productos.
   * @param categoriaFacade Fachada para la gestión del estado de las categorías.
   */
  constructor(
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicia la carga de datos de productos y categorías y establece las
   * suscripciones a sus respectivos observables para mantener los datos
   * locales actualizados.
   */
  ngOnInit(): void {
    // Inicia la carga de datos a través de las fachadas.
    this.productoFacade.cargarProductos();
    this.categoriaFacade.cargarCategorias();

    // Se suscribe al estado de productos. Cuando los productos llegan,
    // actualiza la lista maestra y reaplica el filtro actual.
    this.productoFacade.productos$.subscribe(productos => {
      this.allProducts = productos;
      this.selectCategory(this.selectedCategoryId);
    });
    
    // Se suscribe al estado de categorías para poblar la barra lateral.
    this.categoriaFacade.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });

    // Por defecto, muestra todos los productos al inicio.
    this.selectCategory(null);
  }

  /**
   * Actualiza la lista de productos filtrados basándose en el ID de categoría proporcionado.
   * Este método es invocado por los clics del usuario en la barra lateral.
   *
   * @param categoryId El ID de la categoría por la cual filtrar, o `null` para
   * mostrar todos los productos.
   * @returns {void}
   */
  public selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;

    if (categoryId === null) {
      // Si el ID es nulo, se asigna la lista completa a los productos filtrados.
      this.filteredProducts = this.allProducts;
    } else {
      // Filtra la lista maestra de productos para encontrar aquellos cuya
      // categoría coincida con el ID seleccionado.
      this.filteredProducts = this.allProducts.filter(
        product => product.objCategoria?.id === categoryId
      );
    }
  }
}