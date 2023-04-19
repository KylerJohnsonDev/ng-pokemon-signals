import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button.component';
import { SignalInputDirective } from './directives/input.directive';
import { PokemonStore } from './global-state/pokemon-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonComponent, SignalInputDirective],
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
          class="app-input rounded-l text-white placeholder:text-gray-300 bg-blue-500 grow"
          type="text"
          placeholder="Type a Pokemon and press enter"
          signalInput
          [signal]="searchInput"
          (keydown.enter)="searchForPokemon(searchInput())"
        />
        <button
          type="button"
          class="px-6 bg-green-500 hover:bg-green-600 rounded-r"
          (click)="searchForPokemon(searchInput())"
        >
          Go
        </button>
      </section>
    </nav>
    <main class="flex grow overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  searchInput = signal<string>('');
  constructor(public pokemonStore: PokemonStore) {}

  searchForPokemon(searchInput: string): void {
    if (searchInput.length < 1) return;
    this.pokemonStore.setPokemonName(searchInput);
  }
}
