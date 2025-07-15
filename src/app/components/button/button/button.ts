import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Botón';
  @Input() icon: string = '';
  @Input() color: 'primary' | 'secondary' |'tertiary'| 'danger' = 'primary';
}