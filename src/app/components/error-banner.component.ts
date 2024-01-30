import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  template: `
    @for (message of errorMessages; track $index) {
      <div class="bg-red-500 text-white p-4 rounded">
        <p>{{ message }}</p>
      </div>
    }
  `,
  host: {
    class: 'flex flex-col justify-center gap-4 m-4',
  },
})
export class ErrorBannerComponent {
  @Input({ required: true }) errorMessages!: string[];
}
