import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10),],],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100),],],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200),],],
      logo: ['', [Validators.required]],
      date_release: [''],
      date_revision: [{ value: '', disabled: true }],
    });

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
    this.productService.addProduct(this.productForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('Producto guardado con éxito:', response);
        this.productForm.reset();
      },
      error: (error) => {
        console.error('Error al guardar el producto:', error);
      },
    });
  }

  onReset() {
    this.productForm.reset();
  }
}
