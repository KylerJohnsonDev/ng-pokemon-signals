import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="flex p-2 bg-blue-600 items-center text-white">
      <a class="text-xl" routerLink="/">Angular Signals Playground</a>
      <div class="grow"></div>
      <ul class="flex">
        <li class="mr-2">
          <a routerLink="/pokemon" routerLinkActive="router-link-active"
            >Pokemon</a
          >
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
