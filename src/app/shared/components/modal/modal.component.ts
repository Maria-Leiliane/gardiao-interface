import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title = '';
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }
}
