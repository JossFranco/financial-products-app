import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/bp/products`)
      .pipe(map(response => response.data)
      );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/bp/products/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/bp/products`, product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/bp/products/${id}`, product);
  }
  
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/bp/products/${id}`);
  }
}
