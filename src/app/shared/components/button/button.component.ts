import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
