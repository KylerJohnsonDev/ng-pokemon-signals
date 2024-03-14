import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { PokemonStore } from '../../pokemon.store';
import { PokemonTypeLookupPipe } from '../../utils/pokemon-type-lookup.pipe';
import { TypePillComponent } from 'src/app/components/type-pill.component';
import { PaginatorComponent } from 'src/app/components/paginator.component';
import { MAX_POKEMON_ID } from '../../utils/pokemon-utils';
import { ErrorBannerComponent } from '../../components/error-banner.component';
import { Pokemon } from 'src/app/pokemon.model';
import { authStore } from 'src/app/auth.store';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  template: `
    <main class="grow overflow-auto">
      @if (pokemonStore.errors().length > 0) {
        <app-error-banner [errorMessages]="pokemonStore.errors()" />
      }
      <div class="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
        <section class="flex flex-col items-center">
          <img
            class="h-48 lg:h-96"
            [src]="
              pokemonStore.pokemon()?.sprites?.other?.['official-artwork']
                ?.front_default
            "
            [alt]="pokemonStore.pokemon()?.name"
          />
          <app-paginator
            class="hidden lg:block"
            [isMobile]="false"
            (previous)="onPrevious()"
            (reset)="pokemonStore.loadPokemonByIdentifier(1)"
            (next)="onNext()"
          />
        </section>
        <section class="flex flex-col gap-4">
          <div class="flex gap-4">
            <h1 class="text-2xl capitalize mb-2">
              {{ pokemonStore.pokemon()?.name }}
            </h1>
            <button
              type="button"
              class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              (click)="
                addToFavorites(
                  pokemonStore?.pokemon(),
                  authStore.session()?.user?.id
                )
              "
            >
              Add to favorites
            </button>
          </div>
          <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
            <p>Type:</p>
            <div class="flex flex-row flex-wrap gap-2 max-w-full">
              @for (
                type of pokemonStore.pokemon()?.types;
                track type.type.name
              ) {
                <app-type-pill [text]="type.type.name"></app-type-pill>
              } @empty {
                <span>No Data</span>
              }
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
            <p>Good Against:</p>
            <div class="flex flex-row flex-wrap gap-2 max-w-full">
              @for (type of pokemonStore.goodAgainst(); track type) {
                <app-type-pill [text]="type"></app-type-pill>
              } @empty {
                <span>No Data</span>
              }
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
            <p class="grow-2">Bad Against:</p>
            <div class="flex flex-row flex-wrap gap-2 max-w-full">
              @for (type of pokemonStore.badAgainst(); track type) {
                <app-type-pill [text]="type"></app-type-pill>
              } @empty {
                <span>No Data</span>
              }
            </div>
          </div>
        </section>
      </div>
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
    PokemonTypeLookupPipe,
    ButtonComponent,
    TypePillComponent,
    PaginatorComponent,
    ErrorBannerComponent,
  ],
})
export class PokemonTypeToolComponent {
  @HostBinding('class') class = 'flex flex-col grow';
  readonly pokemonStore = inject(PokemonStore);
  readonly authStore = inject(authStore);

  onPrevious(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier > 1) {
      const previousPokemonId = identifier - 1;
      this.pokemonStore.loadPokemonByIdentifier(previousPokemonId);
    }
  }

  onNext(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier < MAX_POKEMON_ID) {
      const nextPokemonId = identifier + 1;
      this.pokemonStore.loadPokemonByIdentifier(nextPokemonId);
    }
  }

  addToFavorites(pokemon: Pokemon, userId: string): void {
    this.pokemonStore.addToFavorites(pokemon, userId);
  }
}
