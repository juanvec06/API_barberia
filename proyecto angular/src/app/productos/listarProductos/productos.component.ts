// Ruta: src/app/productos/listarProductos/productos.component.ts 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Producto } from '../modelos/producto';
import { ProductoFacadeService } from '../servicios/producto-facade.service'; 
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  // Esta lista se llenará desde el Observable de la fachada
  public listaProductos: Producto[] = [];

  constructor(private productoFacade: ProductoFacadeService) { }

  ngOnInit(): void {
    // Si ya fueron cargados por otro componente, la fachada nos dará el estado actual sin
    // necesidad de hacer otra llamada HTTP, gracias al BehaviorSubject.
    this.productoFacade.cargarProductos();

    this.productoFacade.productos$.subscribe(productos => {
      this.listaProductos = productos;
    });
  }

  /**
   * Método para eliminar un producto.
   */
  public eliminarProducto(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar el servicio "${producto.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-acento)',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: 'var(--color-cuerpo)',
      color: 'var(--color-texto)'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoFacade.eliminarProducto(producto.id);
        
        Swal.fire({
          title: '¡Eliminado!',
          text: `El servicio "${producto.nombre}" ha sido eliminado.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: 'var(--color-cuerpo)',
          color: 'var(--color-texto)'
        });
      }
    });
  }
}