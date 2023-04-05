import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-600 rounded text-white font-bold py-2 px-4"
      (click)="onClick($event)"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text!: string;
  @Output() click = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(event);
  }
}
