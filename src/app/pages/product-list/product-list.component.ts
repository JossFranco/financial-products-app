import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HeaderComponent, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  productsFiltered: Product[] = [];
  productsPaged: Product[] = [];
  isMenuOpen: boolean = false;
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.productsFiltered = data;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  addProduct() {
    this.isMenuOpen = false;
   this.router.navigate(['add']);
  }
  editProduct(product: Product) {
    console.log('Editar', product.id);
    this.isMenuOpen = false;
    this.router.navigate(['edit/:id', product.id]);
  }

  deleteProduct(product: Product) {
    console.log('Eliminar', product);

    this.isMenuOpen = false;
  }

  onSearchTermChange(searchTerm: string) {
    if (searchTerm) {
      this.productsFiltered = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.productsFiltered = [...this.products];
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.productsPaged = this.productsFiltered.slice(startIndex, endIndex);
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.updatePagination();
  }
}
