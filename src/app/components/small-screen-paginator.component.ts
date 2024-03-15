import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-small-screen-paginator',
  standalone: true,
  imports: [],
  template: `
    <button type="button"
            class="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            (click)="previous.emit()">
      <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 8 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"></path>
      </svg>
      <span class="sr-only">Previous Icon Button</span>
    </button>
    <button type="button"
            class="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            (click)="next.emit()">
      <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 8 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
      </svg>
      <span class="sr-only">Next Icon Button</span>
    </button>
  `,
  styles: ``,
  host: {
    class: 'flex justify-between w-full',
  }
})
export class SmallScreenPaginatorComponent {
  @Output() previous = new EventEmitter<unknown>();
  @Output() next = new EventEmitter<unknown>();

}
