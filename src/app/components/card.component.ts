import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
      <a>
        <img class="rounded-t-lg" [src]="imageUrl()" [alt]="imageAlt()" />
      </a>
      <div class="p-5 flex flex-col items-center">
        <a>
          <h5
            class="text-center mb-2 text-2xl font-bold tracking-tight text-white"
          >
            {{ title() }}
          </h5>
        </a>
        @if (description()?.length) {
          <p class="mb-3 font-normal text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        }
        @if (showButton()) {
          <a
            (click)="buttonClick.emit()"
            class="max-w-fit margin-auto cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{ buttonText() }}
          </a>
        }
      </div>
    </div>
  `,
})
export class CardComponent {
  title = input<string>();
  description = input<string>();
  imageUrl = input<string>();
  imageAlt = input<string>();
  showButton = input<boolean>(true);
  buttonText = input<string>();
  @Output() buttonClick = new EventEmitter();
}
