// Ruta: src/app/productos/crearProductos/form-crear.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/modelos/categoria';
import { CategoriaFacadeService } from '../../categorias/servicios/categoria-facade.service'; // <-- 1. IMPORTAR FACHADA DE CATEGORÍAS
import { ProductoFacadeService } from '../servicios/producto-facade.service'; // <-- 2. IMPORTAR FACHADA DE PRODUCTOS
import Swal from 'sweetalert2';

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

  public productForm!: FormGroup;
  public categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoFacade: ProductoFacadeService,
    private categoriaFacade: CategoriaFacadeService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      objCategoria: [null, Validators.required],
      estado: ['Disponible', Validators.required],
      duracion: [''],
      precio: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    this.categoriaFacade.cargarCategorias();
    this.categoriaFacade.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  // Getter para acceder a los controles
  get f() { return this.productForm.controls; }

  public registrarProducto(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    // Le pasamos el valor crudo del formulario. La fachada se encargará del resto.
    this.productoFacade.crearProducto(this.productForm.value);

    // Mostramos la notificación de éxito inmediatamente.
    // La fachada se encargará de recargar la lista en segundo plano.
    Swal.fire({
      title: '¡Servicio Registrado!',
      text: `El servicio "${this.productForm.value.nombre}" ha sido creado.`,
      icon: 'success',
      confirmButtonText: 'Genial',
      background: 'var(--color-cuerpo)',
      color: 'var(--color-texto)',
      confirmButtonColor: 'var(--color-acento)'
    });

    // Navegamos de vuelta a la lista
    this.router.navigate(['/listarProducto']);
  }
}