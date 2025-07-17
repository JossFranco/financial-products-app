import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() open: boolean = true;
  @Input() title: string = '';
  @Input() content: string = '';

  close() {
    this.open = false;
  }
}
