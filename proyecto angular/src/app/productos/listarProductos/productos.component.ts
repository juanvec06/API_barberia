/**
 * @file Contiene la lógica para el componente que lista los productos/servicios.
 * @description Este componente es la vista principal del administrador para ver,
 * gestionar, y eliminar los productos existentes. Se comunica con la fachada
 * de productos para obtener y reaccionar a los cambios en la lista de servicios.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Producto } from '../modelos/producto';
import { ProductoFacadeService } from '../servicios/producto-facade.service';
import Swal from 'sweetalert2';

/**
 * Componente para mostrar la lista de productos en una tabla.
 *
 * Se suscribe al estado de los productos a través de `ProductoFacadeService` para
 * mostrar una lista siempre actualizada. Proporciona funcionalidades para

 * navegar a las vistas de creación/edición y para iniciar el proceso de
 * eliminación de un producto.
 */
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  /**
   * Almacena la lista de productos que se renderizará en la plantilla.
   * Esta propiedad se actualiza de forma reactiva gracias a la suscripción
   * al observable `productos$` de la fachada.
   */
  public listaProductos: Producto[] = [];

  /**
   * @param productoFacade La fachada que gestiona el estado y la lógica
   * de negocio de los productos.
   */
  constructor(private productoFacade: ProductoFacadeService) { }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicia la carga de productos a través de la fachada y establece la
   * suscripción para mantener `listaProductos` sincronizada con el estado global.
   */
  ngOnInit(): void {
    // Solicita a la fachada que cargue la lista de productos. Si los datos ya
    // están en el estado (gracias a `BehaviorSubject`), se emitirán
    // inmediatamente sin una nueva llamada HTTP.
    this.productoFacade.cargarProductos();

    // Se suscribe al stream de productos. Cada vez que la lista en la fachada
    // cambie, esta función se ejecutará, actualizando la lista local.
    this.productoFacade.productos$.subscribe(productos => {
      this.listaProductos = productos;
    });
  }

  /**
   * Inicia el flujo de eliminación de un producto.
   * Muestra un diálogo de confirmación al usuario utilizando SweetAlert2. Si el
   * usuario confirma la acción, se invoca el método de eliminación en la fachada.
   *
   * @param producto El objeto del producto que se desea eliminar.
   * @returns {void}
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
      // Si el usuario hace clic en "Sí, eliminar".
      if (result.isConfirmed) {
        // Delega la lógica de eliminación a la fachada.
        this.productoFacade.eliminarProducto(producto.id);
        
        // Muestra una notificación de éxito efímera.
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