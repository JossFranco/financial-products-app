import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'edit', component: ProductEditComponent },
];
