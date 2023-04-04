import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  host: {
    class: 'flex flex-col h-full',
  },
  template: `
    <nav class="flex p-2 bg-blue-600 items-center text-white">
      <a class="text-xl" routerLink="/">
        <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
      </a>
      <div class="grow"></div>
      <ul class="flex">
        <li class="mr-2">
          <a routerLink="/pokemon" routerLinkActive="router-link-active"
            >Pokemon</a
          >
        </li>
      </ul>
    </nav>
    <main class="flex grow overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
