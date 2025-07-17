import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionsComponent } from '../../components/options/options.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, HeaderComponent, SearchComponent, OptionsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  productsFiltered: Product[] = [];
  isMenuOpen: boolean = false;
  itemsPerPage: number = 5;

  constructor(
    private productService: ProductService, 
    private router: Router
  ) { }

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

  addProduct() {
    this.router.navigate(['add']);
  }

  onSearchTermChange(searchTerm: string) {
    if (searchTerm) {
      this.productsFiltered = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.productsFiltered = [...this.products];
    }
  }
}
