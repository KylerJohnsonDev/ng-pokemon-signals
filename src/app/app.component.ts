import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button.component';
import { PokemonStore } from './global-state/pokemon-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  providers: [],
  host: {
    class: 'flex flex-col h-full',
  },
  template: `
    <nav class="flex p-2 bg-blue-600 items-center text-white">
      <a class="text-xl" routerLink="/">
        <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
      </a>
      <div class="grow"></div>
      <section class="hidden lg:flex w-72 flex-row m-4">
        <input
          class="app-input text-white placeholder:text-gray-300 bg-blue-500 grow"
          type="text"
          placeholder="Type a Pokemon and press enter"
          (keyup.enter)="onEnter($event)"
        />
      </section>
    </nav>
    <main class="flex grow overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  constructor(public pokemonStore: PokemonStore) {}

  onEnter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pokemonStore.pokemonName.set(input.value);
  }
}
