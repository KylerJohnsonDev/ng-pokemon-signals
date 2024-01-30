import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { SignalInputDirective } from 'src/app/directives/input.directive';
import { PokemonStore } from './pokemon.store';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PaginatorComponent } from 'src/app/components/paginator.component';
import { ErrorBannerComponent } from 'src/app/components/error-banner.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <main class="grow overflow-auto">
      @if (pokemonStore.errors().length > 0) {
        <app-error-banner [errorMessages]="pokemonStore.errors()" />
      }
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
          class="px-6 bg-blue-500 rounded-r cursor-pointer"
          (click)="searchForPokemon(searchInput())"
        >
          Go
        </button>
      </section>
      <app-pokemon-detail class="m-4"></app-pokemon-detail>
    </main>
    <footer>
      <app-paginator
        [isMobile]="true"
        (previous)="onPrevious()"
        (reset)="pokemonStore.loadPokemonByIdentifier(1)"
        (next)="onNext()"
      />
    </footer>
  `,
  imports: [
    CommonModule,
    ButtonComponent,
    PokemonDetailComponent,
    SignalInputDirective,
    PaginatorComponent,
    ErrorBannerComponent,
  ],
})
export class PokemonComponent {
  @HostBinding('class') class = 'flex flex-col grow';
  searchInput = signal<string>('');
  readonly pokemonStore = inject(PokemonStore);

  searchForPokemon(searchInput: string): void {
    if (searchInput.length < 1) return;
    this.pokemonStore.loadPokemonByIdentifier(searchInput);
    this.searchInput.set('');
  }

  onPrevious(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier > 1) {
      const previousPokemonId = identifier - 1;
      this.pokemonStore.loadPokemonByIdentifier(previousPokemonId);
    }
  }

  onNext(): void {
    const maxNumberOfPokemon = 1024;
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier < maxNumberOfPokemon) {
      const nextPokemonId = identifier + 1;
      this.pokemonStore.loadPokemonByIdentifier(nextPokemonId);
    }
  }
}
