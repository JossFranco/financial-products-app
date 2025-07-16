import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, HeaderComponent, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  productsFiltered: Product[] = [];
  isMenuOpen: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.productsFiltered = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
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

  onSearchTermChange(searchTerm: string) {
    if (searchTerm) {
      this.productsFiltered = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.productsFiltered = [...this.products];
    }
  }
}
