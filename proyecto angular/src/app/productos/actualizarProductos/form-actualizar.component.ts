// Ruta: src/app/productos/actualizarProductos/form-actualizar.component.ts 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/modelos/categoria';
import { ProductoFacadeService } from '../servicios/producto-facade.service';
import { CategoriaFacadeService } from '../../categorias/servicios/categoria-facade.service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';

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

  public productForm!: FormGroup;
  public categorias: Categoria[] = [];
  private currentProductId!: number;

  // Constructor 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  ngOnInit(): void {
    // 1. Definimos la estructura del formulario
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      objCategoria: [null, Validators.required],
      estado: ['Disponible', Validators.required],
      duracion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      imagen: [null, Validators.required]
    });

    // 2. Obtenemos el ID de la URL una sola vez.
    this.currentProductId = this.activatedRoute.snapshot.params['id'];

    // 3. Iniciamos la carga de datos a través de las fachadas.
    this.categoriaFacade.cargarCategorias();
    if (this.currentProductId) {
      this.productoFacade.cargarProductoSeleccionado(this.currentProductId);
    }

    // 4. Nos suscribimos al estado de las categorías para poblar el dropdown.
    this.categoriaFacade.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });

    // 5. Nos suscribimos al estado del producto seleccionado en la fachada para poblar el formulario.
    // Usamos 'filter' de RxJS para evitar que se ejecute cuando el valor es 'null'.
    this.productoFacade.selectedProduct$.pipe(
      filter(Boolean) // Solo continúa si el producto no es null
    ).subscribe(productoEncontrado => {
      // Nos aseguramos de tener las categorías antes de poblar para evitar errores.
      if (this.categorias.length > 0) {
        this.productForm.patchValue(productoEncontrado);
        const categoriaCorrecta = this.categorias.find(c => c.id === productoEncontrado.objCategoria?.id);
        this.productForm.get('objCategoria')?.setValue(categoriaCorrecta || null);
      }
    });
  }

  // Getter para un acceso más fácil a los controles en el HTML (sin cambios).
  get f() { return this.productForm.controls; }

  /**
 * Se ejecuta cuando el usuario selecciona un archivo en el input de imagen.
 * @param event El evento del input de archivo.
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

  // El método para actualizar ya usaba la fachada, así que no necesita cambios.
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