import {CommonModule} from '@angular/common';
import {Component, HostBinding, computed, inject, input} from '@angular/core';
import {ButtonComponent} from 'src/app/components/button.component';
import {PokemonStore} from '../pokemon.store';
import {PokemonTypeLookupPipe} from '../utils/pokemon-type-lookup.pipe';
import {TypePillComponent} from 'src/app/components/type-pill.component';
import {PaginatorComponent} from 'src/app/components/paginator.component';
import {MAX_POKEMON_ID} from '../utils/pokemon-utils';
import {ErrorBannerComponent} from '../components/error-banner.component';
import {authStore} from 'src/app/auth.store';
import {PokemonSearchComponent} from '../components/pokemon-search.component';
import {SmallScreenPaginatorComponent} from "../components/small-screen-paginator.component";
import {SmallScreenObserverStore} from "../small-screen-observer.store";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  template: `
    <main class="grow overflow-auto">
      @if (pokemonStore.errors().length > 0) {
        <app-error-banner [errorMessages]="pokemonStore.errors()"/>
      }
      <app-pokemon-search/>
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

          @defer (when !breakpointObserver.isSmallScreen()) {
            @if (!breakpointObserver.isSmallScreen()) {
              <app-paginator
                (previous)="onPrevious()"
                (reset)="pokemonStore.loadPokemonByIdentifier(1)"
                (next)="onNext()"
              />
            }
          }
          @defer (when breakpointObserver.isSmallScreen()) {
            @if (breakpointObserver.isSmallScreen()) {
              <app-small-screen-paginator
                (previous)="onPrevious()"
                (next)="onNext()"/>
            }
          }

        </section>
        <section class="flex flex-col gap-4">
          <div class="flex gap-4">
            <h1 class="text-2xl capitalize mb-2">
              {{ pokemonStore.pokemon()?.name }}
            </h1>
            <button
              type="button"
              [ngClass]="{ hidden: !authStore.session() }"
              [disabled]="pokemonStore.isFavorite()"
              class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
              (click)="pokemonStore.addToFavorites(pokemonStore?.pokemon())"
            >
              Add to favorites
            </button>
          </div>
          <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
            <p>Type:</p>
            <div class="flex flex-row flex-wrap gap-2 max-w-full">
              @for (type of pokemonStore.pokemon()?.types;
                track type.type.name) {
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
  `,
  imports: [
    CommonModule,
    PokemonTypeLookupPipe,
    ButtonComponent,
    TypePillComponent,
    PaginatorComponent,
    ErrorBannerComponent,
    PokemonSearchComponent,
    SmallScreenPaginatorComponent,
  ],
})
export class PokemonDetailPageComponent {
  @HostBinding('class') class = 'flex flex-col grow';
  id = input<string | number>();
  iden = computed(() => this.id() ?? 'bulbasaur');
  readonly pokemonStore = inject(PokemonStore);
  readonly authStore = inject(authStore);
  readonly breakpointObserver = inject(SmallScreenObserverStore);

  constructor() {
    this.pokemonStore.loadPokemonByIdentifier(this.iden);
  }

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
}
