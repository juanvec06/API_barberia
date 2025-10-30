/**
 * @file Contiene la lógica para el componente del formulario de actualización de productos.
 * @description Este componente es responsable de renderizar y gestionar el formulario
 * para modificar un servicio/producto existente. Se encarga de precargar los datos
 * del producto, manejar las validaciones y enviar la solicitud de actualización.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/modelos/categoria';
import { ProductoFacadeService } from '../servicios/producto-facade.service';
import { CategoriaFacadeService } from '../../categorias/servicios/categoria-facade.service';
import Swal from 'sweetalert2';
import { combineLatest, filter } from 'rxjs';

/**
 * Componente para el formulario de actualización de un producto.
 *
 * Implementa un formulario reactivo que se inicializa con los datos de un
 * producto específico, obtenido a través de su ID en la URL. Utiliza las
 * fachadas de Producto y Categoría para interactuar con el estado de la
 * aplicación de manera desacoplada.
 */
@Component({
  selector: 'app-form-actualizar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-actualizar.component.html',
  styleUrl: './form-actualizar.component.css'
})
export class FormActualizarComponent implements OnInit {

  /**
   * Instancia del FormGroup que gestiona el estado y la validación del formulario.
   */
  public productForm!: FormGroup;

  /**
   * Arreglo que almacena la lista de categorías disponibles para poblar el
   * selector (dropdown) en el formulario.
   */
  public categorias: Categoria[] = [];

  /**
   * Almacena el ID del producto que se está editando. Se obtiene de los
   * parámetros de la ruta.
   * @private
   */
  private currentProductId!: number;

  /**
   * @param fb Service para construir formularios reactivos (`FormGroup`, `FormControl`).
   * @param router Service para la navegación entre componentes.
   * @param activatedRoute Service para acceder a la información de la ruta activa, como los parámetros.
   * @param productoFacade Fachada para la gestión del estado de los productos.
   * @param categoriaFacade Fachada para la gestión del estado de las categorías.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  /**
   * Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Define la estructura del formulario, inicia la carga de datos necesarios
   * (producto a editar y lista de categorías) y se suscribe a los observables
   * para poblar el formulario una vez que los datos estén disponibles.
   */
  ngOnInit(): void {
    // Define la estructura y validadores para cada control del formulario.
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      objCategoria: [null, Validators.required],
      estado: ['Disponible', Validators.required],
      duracion: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      precio: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      imagen: [null, Validators.required]
    });

    // Obtiene el ID del producto de los parámetros de la URL.
    this.currentProductId = this.activatedRoute.snapshot.params['id'];

    // Dispara las acciones para cargar los datos a través de las fachadas.
    this.categoriaFacade.cargarCategorias();
    if (this.currentProductId) {
      this.productoFacade.cargarProductoSeleccionado(this.currentProductId);
    }

    // Utiliza `combineLatest` de RxJS para sincronizar la llegada de datos.
    // El código dentro del `subscribe` solo se ejecuta cuando tanto la lista
    // de categorías como el producto seleccionado han sido emitidos.
    // Esto previene errores de "condición de carrera" (race condition).
    combineLatest({
      categorias: this.categoriaFacade.categorias$,
      producto: this.productoFacade.selectedProduct$.pipe(filter(Boolean)) // `filter(Boolean)` ignora el valor inicial nulo.
    }).subscribe(({ categorias, producto }) => {
      
      this.categorias = categorias;
      const categoriaCorrecta = categorias.find(c => c.id === producto.objCategoria?.id);

      // Puebla el formulario (`patchValue`) con los datos del producto.
      // Realiza un mapeo manual para los campos `duracion`, `estado` y `objCategoria`
      // para asegurar la compatibilidad entre el modelo de datos y el formulario.
      this.productForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
        duracion: producto.duracionMin, // Asigna el valor numérico directamente.
        estado: producto.estado ? 'Disponible' : 'No Disponible', // Convierte booleano a string.
        objCategoria: categoriaCorrecta || null // Asigna el objeto de categoría completo.
      });
    });
  }

  /**
   * Getter de conveniencia para acceder fácilmente a los controles del formulario
   * desde la plantilla HTML.
   * @returns Los controles del `productForm`.
   */
  get f() { return this.productForm.controls; }

  /**
   * Maneja el evento de selección de un archivo de imagen.
   * Lee el archivo seleccionado usando `FileReader` y lo convierte a una cadena
   * Base64 para ser almacenada en el formulario y mostrada como vista previa.
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
   * Gestiona el envío del formulario.
   * Si el formulario es inválido, marca todos los campos como "tocados" para
   * mostrar los mensajes de error. Si es válido, delega la lógica de actualización
   * a `ProductoFacadeService`, muestra una notificación de éxito con SweetAlert2
   * y redirige al usuario a la lista de productos.
   */
  public actualizarProducto(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productoFacade.actualizarProducto(this.currentProductId, this.productForm.value);

    Swal.fire({
      title: '¡Servicio Actualizado!',
      text: `El servicio "${this.productForm.value.nombre}" ha sido modificado.`,
      icon: 'success',
      confirmButtonText: 'Excelente',
      background: 'var(--color-cuerpo)',
      color: 'var(--color-texto)',
      confirmButtonColor: 'var(--color-acento)'
    });

    this.router.navigate(['/listarProducto']);
  }
}