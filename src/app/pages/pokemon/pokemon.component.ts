import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button.component';
import { PokemonStore } from '../../global-state/pokemon-store';
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
      <section class="lg:hidden flex flex-row m-4">
        <input
          class="app-input rounded-l bg-gray-600 text-white grow"
          type="text"
          placeholder="Type a Pokemon and press enter"
          [(ngModel)]="searchInput"
          (keydown.enter)="searchForPokemon(searchInput)"
        />
        <button
          type="button"
          class="px-6 bg-blue-500 rounded-r"
          (click)="searchForPokemon(searchInput)"
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
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="onReset()">
        Reset
      </button>
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="onNext()">
        Next
      </button>
    </footer>
  `,
  imports: [CommonModule, ButtonComponent, PokemonDetailComponent, FormsModule],
})
export class PokemonComponent {
  searchInput = '';
  constructor(public pokemonStore: PokemonStore) {}

  searchForPokemon(searchInput: string): void {
    if (searchInput.length < 1) return;
    this.pokemonStore.setPokemonName(searchInput);
  }

  onPrevious(): void {
    this.pokemonStore.setPokemonId(this.pokemonStore.pokemonId() - 1);
  }

  onReset(): void {
    this.pokemonStore.setPokemonId(1);
  }

  onNext(): void {
    this.pokemonStore.setPokemonId(this.pokemonStore.pokemonId() + 1);
  }
}
