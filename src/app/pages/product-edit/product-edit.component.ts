import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private  productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, /* Validators.pattern('^[0-9]+$') */]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      releaseDate: ['2023-02-22'],  
      reviewDate: [{value: '2024-02-22', disabled: true}]  
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
this.productService.updateProduct(this.productForm.value.id, this.productForm.value )

  }
  }
  onReset(): void {
    this.productForm.reset({
      name: 'Tarjeta Crédito',
      releaseDate: '2023-02-22',
      reviewDate: '2024-02-22'
    });
  }
}

