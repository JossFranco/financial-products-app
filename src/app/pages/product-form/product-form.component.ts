import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  pageTitle: string = "";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;
    this.pageTitle = this.isEditMode ? 'Formulario de Edición' : 'Formulario de Registro';

    this.productForm = this.fb.group({
      id: [
        { value: '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [''],
      date_revision: [{ value: '', disabled: true }],
    });

    if (this.isEditMode && this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        if (product) {
          this.productForm.patchValue({
            id: product.id,
            name: product.name,
            description: product.description,
            logo: product.logo,
            date_release: product.date_release,
            date_revision: product.date_revision
          });
        }
      });
    }

    this.productForm.get('date_release')?.valueChanges.subscribe((date: string) => {
      if (date) {
        const release = new Date(date);
        const review = new Date(release);
        review.setFullYear(release.getFullYear() + 1);
        const formatted = review.toISOString().split('T')[0];
        this.productForm.get('date_revision')?.setValue(formatted);
      } else {
        this.productForm.get('date_revision')?.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.getRawValue();
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formValue).subscribe({
        next: (response) => {
          console.log('Producto actualizado con éxito:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
        },
      });
    } else {
      this.productService.addProduct(formValue).subscribe({
        next: (response) => {
          console.log('Producto guardado con éxito:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al guardar el producto:', error);
        },
      });
    }
  }

  onReset() {
    this.productForm.reset();
  }
}
