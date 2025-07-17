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
  @Input() showFooter: boolean = false;
  @Output() confirmClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  confirm() {
    this.confirmClick.emit();
  }

  close() {
    this.open = false;
    this.cancelClick.emit();
  }
}
