import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  host: {
    class: 'w-full h-full flex items-center justify-center',
  },
  template: ` <h1 class="text-4xl font-bold">Coming Soon</h1> `,
})
export class ProfilePageComponent {
  constructor() {}
}
