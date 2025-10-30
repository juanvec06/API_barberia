/**
 * @file Contiene la lógica para el componente del formulario de creación de productos.
 * @description Este componente presenta al usuario un formulario para registrar un
 * nuevo servicio/producto. Se encarga de la construcción del formulario, la gestión
 * de sus validaciones y el envío de los datos para la creación.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/modelos/categoria';
import { CategoriaFacadeService } from '../../categorias/servicios/categoria-facade.service';
import { ProductoFacadeService } from '../servicios/producto-facade.service';
import Swal from 'sweetalert2';

/**
 * Componente para el formulario de creación de un nuevo producto.
 *
 * Utiliza formularios reactivos de Angular para capturar los datos del nuevo
 * servicio. Interactúa con `CategoriaFacadeService` para obtener la lista
 * de categorías y con `ProductoFacadeService` para delegar la lógica de creación
 * del nuevo producto.
 */
@Component({
  selector: 'app-form-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-crear.component.html',
  styleUrl: './form-crear.component.css'
})
export class FormCrearComponent implements OnInit {

  /**
   * Instancia del FormGroup que gestiona el estado y la validación del formulario de creación.
   */
  public productForm!: FormGroup;

  /**
   * Almacena la lista de categorías disponibles para el selector (dropdown) del formulario.
   */
  public categorias: Categoria[] = [];

  /**
   * @param fb Service para construir formularios reactivos.
   * @param router Service para la navegación entre componentes.
   * @param productoFacade Fachada para la gestión del estado de los productos.
   * @param categoriaFacade Fachada para la gestión del estado de las categorías.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Es responsable de definir la estructura del `productForm` con sus respectivos
   * validadores e iniciar la carga de la lista de categorías.
   */
  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      objCategoria: [null, Validators.required],
      estado: ['Disponible', Validators.required], // Valor por defecto.
      duracion: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      precio: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      imagen: [null, Validators.required]
    });

    // Solicita la carga de categorías y se suscribe para actualizar la lista local.
    this.categoriaFacade.cargarCategorias();
    this.categoriaFacade.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  /**
   * Getter de conveniencia para un acceso simplificado a los controles del
   * formulario desde la plantilla HTML.
   * @returns Los controles del `productForm`.
   */
  get f() { return this.productForm.controls; }

  /**
   * Maneja el evento de selección de un archivo de imagen desde el input.
   * Utiliza `FileReader` para convertir la imagen seleccionada a una cadena
   * en formato Base64, la cual se almacena en el control 'imagen' del formulario.
   * @param event El evento DOM del input de tipo archivo.
   */
  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Gestiona el envío del formulario de registro.
   * Primero, verifica si el formulario es válido. Si no lo es, marca todos los
   * campos como "tocados" para activar la visualización de los mensajes de error.
   * Si es válido, invoca el método `crearProducto` de la fachada, muestra una
   * notificación de éxito y navega al usuario de vuelta a la lista de productos.
   */
  public registrarProducto(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productoFacade.crearProducto(this.productForm.value);

    Swal.fire({
      title: '¡Servicio Registrado!',
      text: `El servicio "${this.productForm.value.nombre}" ha sido creado.`,
      icon: 'success',
      confirmButtonText: 'Genial',
      background: 'var(--color-cuerpo)',
      color: 'var(--color-texto)',
      confirmButtonColor: 'var(--color-acento)'
    });

    this.router.navigate(['/listarProducto']);
  }
}