import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return an array of product when getProducts is called', (done) => {
  //   const mockProducts = [
  //     {
  //       id: 'test',
  //       name: 'Test Product',
  //       description: 'Test Description',
  //       logo: 'test-logo.png',
  //       date_release: '2024-01-01',
  //       date_revision: '2024-12-31'
  //     }
  //   ];
  //   service.getProducts().subscribe(products => {
  //     expect(products).toEqual(mockProducts);
  //   });
  //   const req = httpTestingController.expectOne('http://localhost:3002/bp/products');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockProducts);
  // });

});
