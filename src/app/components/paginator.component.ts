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
    @if (_isMobile) {
      <button
        class="font-bold grow py-2 px-4 bg-blue-500"
        (click)="previous.emit()"
      >
        Previous
      </button>
      @if (showResetButton) {
        <button
          class="font-bold grow py-2 px-4 bg-blue-500"
          (click)="reset.emit()"
        >
          Reset
        </button>
      }
      <button
        class="font-bold grow py-2 px-4 bg-blue-500"
        (click)="next.emit()"
      >
        Next
      </button>
    } @else {
      <app-button text="Previous" (click)="previous.emit()"></app-button>
      @if (showResetButton) {
        <app-button text="Reset" (click)="reset.emit()"></app-button>
      }
      <app-button text="Next" (click)="next.emit()"> </app-button>
    }
  `,
  styles: ``,
})
export class PaginatorComponent {
  _isMobile = true;
  @HostBinding('class') hostClasses = 'flex flex-row lg:hidden bg-white gap-px';
  @Input() set isMobile(value: boolean) {
    this._isMobile = value !== undefined ? value : true;
    this.classes = value
      ? 'flex flex-row lg:hidden bg-white gap-px'
      : 'hidden lg:flex flex-row mb-4 lg:w-72 gap-2 mx-4';
  }
  @Input() showResetButton = true;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @HostBinding('class') classes =
    'hidden lg:flex flex-row mb-4 lg:w-72 gap-2 mx-4';
}
