import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../core/services/product.service';
import { NgFor, NgIf  } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  products: Product[] = [];
  isMenuOpen: boolean = false;

  constructor( private  productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void { 
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      } ,
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }


toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

editProduct(product: Product) {
  console.log('Editar', product);
  this.isMenuOpen = false;

}

deleteProduct(product: Product) {
  console.log('Eliminar', product);
  this.isMenuOpen = false;

}
}
