import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `

      <app-button text="Previous" (click)="previous.emit()"></app-button>
      @if (showResetButton) {
        <app-button text="Reset" (click)="reset.emit()"></app-button>
      }
      <app-button text="Next" (click)="next.emit()"> </app-button>

  `,
  styles: ``,
})
export class PaginatorComponent {

  @Input() showResetButton = true;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @HostBinding('class') classes =
    'flex flex-row mb-4 w-72 gap-2 mx-4';
}
