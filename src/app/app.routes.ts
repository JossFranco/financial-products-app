import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'add', component: ProductCreateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
