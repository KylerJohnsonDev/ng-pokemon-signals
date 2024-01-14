import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { SignalInputDirective } from 'src/app/directives/input.directive';
import { PokemonStore } from './pokemon.store';
import { PokemonDetailComponent } from './pokemon-detail.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  // signals: true,
  host: {
    class: 'flex flex-col grow',
  },
  template: `
    <main class="grow overflow-auto">
      <section class="flex flex-row m-4">
        <input
          class="app-input rounded-l bg-gray-600 text-white grow"
          type="text"
          placeholder="Type a Pokemon and press enter"
          signalInput
          [signal]="searchInput"
          (keydown.enter)="searchForPokemon(searchInput())"
        />
        <button
          type="button"
          class="px-6 bg-blue-500 rounded-r"
          (click)="searchForPokemon(searchInput())"
        >
          Go
        </button>
      </section>
      <app-pokemon-detail class="m-4"></app-pokemon-detail>
    </main>
    <footer class="flex flex-row lg:hidden bg-white gap-px">
      <button
        class="font-bold grow py-2 px-4 bg-blue-500"
        (click)="onPrevious()"
      >
        Previous
      </button>
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="pokemonStore.resetState()">
        Reset
      </button>
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="onNext()">
        Next
      </button>
    </footer>
  `,
  imports: [
    CommonModule,
    ButtonComponent,
    PokemonDetailComponent,
    SignalInputDirective,
  ],
})
export class PokemonComponent {
  searchInput = signal<string>('');
  readonly pokemonStore = inject(PokemonStore);

  searchForPokemon(searchInput: string): void {
    if (searchInput.length < 1) return;
    this.pokemonStore.loadPokemonByIdentifier(searchInput);
    this.searchInput.set('');
  }

  onPrevious(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if(identifier > 1) {
      const previousPokemonId = identifier - 1;
      this.pokemonStore.loadPokemonByIdentifier(previousPokemonId)
    }
  }

  onNext (): void {
    const maxNumberOfPokemon = 1024;
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if(identifier < maxNumberOfPokemon) {
      const nextPokemonId = identifier + 1;
      this.pokemonStore.loadPokemonByIdentifier(nextPokemonId)
    }
  }
}
