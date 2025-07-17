import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {
  @Input() productId: string = '';

  isMenuOpen: boolean = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editProduct() {
    this.router.navigate([`edit/${this.productId}`]);
  }

  deleteProduct() {
    this.isMenuOpen = false;
  }
}
