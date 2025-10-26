// Ruta: src/app/productos/ver-productos-por-categorias/ver-productos-por-categorias.component.ts 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../categorias/modelos/categoria';
import { Producto } from '../productos/modelos/producto';
import { ProductoFacadeService } from '../productos/servicios/producto-facade.service';
import { CategoriaFacadeService } from '../categorias/servicios/categoria-facade.service'; 
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-ver-productos-por-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-productos-por-categorias.component.html',
  styleUrl: './ver-productos-por-categorias.component.css'
})
export class VerProductosPorCategoriasComponent implements OnInit {

  private allProducts: Producto[] = [];
  public filteredProducts: Producto[] = [];

  public categorias: Categoria[] = []; 
  public selectedCategoryId: number | null = null;

  constructor(
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  ngOnInit(): void {
    // 3. INICIAMOS LA CARGA DE AMBOS TIPOS DE DATOS
    this.productoFacade.cargarProductos();
    this.categoriaFacade.cargarCategorias();

    // 4. NOS SUSCRIBIMOS AL ESTADO DE PRODUCTOS
    this.productoFacade.productos$.subscribe(productos => {
      this.allProducts = productos;
      this.selectCategory(this.selectedCategoryId); 
    });
    
    // 5. NOS SUSCRIBIMOS AL ESTADO DE CATEGORÍAS
    this.categoriaFacade.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });

    // Seleccionamos "Todas" por defecto
    this.selectCategory(null);
  }

  public selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;

    if (categoryId === null) {
      this.filteredProducts = this.allProducts;
      console.log('Mostrando todos los productos desde el estado.');
    } else {
      this.filteredProducts = this.allProducts.filter(
        product => product.objCategoria?.id === categoryId
      );
      console.log(`Filtrando productos para la categoría: ${categoryId}`);
    }
  }
}