import { Component, inject } from '@angular/core';
import { CardComponent } from 'src/app/components/card.component';
import { PokemonStore } from 'src/app/pokemon.store';
import { PokemonImagePipe } from 'src/app/utils/pokemon-image.pipe';

@Component({
  selector: 'app-browse-pokemon-page',
  standalone: true,
  imports: [CardComponent, PokemonImagePipe],
  host: {
    class: 'h-full w-full',
  },
  template: `

    <div class="flex flex-col items-center mb-4">
      <span class="text-sm text-gray-400">
        Showing
        <span class="font-semibold text-white">{{
            pokemonStore.pokemonCollectionQuery().offset + 1
          }}</span>
        to
        <span class="font-semibold text-white">{{
            pokemonStore.pokemonCollectionQuery().limit *
            pokemonStore.currentPage()
          }}</span>
        of
        <span class="font-semibold text-white">{{
            pokemonStore.totalCount()
          }}</span>
        Entries
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <!-- Buttons -->
        <button
          (click)="pokemonStore.paginatePokemonCollection('previous')"
          class="flex items-center justify-center px-4 h-10 text-base font-medium rounded-s bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <svg
            class="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          (click)="pokemonStore.paginatePokemonCollection('next')"
          class="flex items-center justify-center px-4 h-10 text-base font-medium border-0 border-s rounded-e  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Next
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
    >
      @for (item of pokemonStore.pokemonCollection(); track item.name) {
        <app-card
          class="h-auto max-w-full"
          [cardClickUrl]="'/pokemon/' + item.name"
          [imageUrl]="item.url | pokemonImageUrlFromUrl"
          [imageAlt]="item.name"
          [title]="item.name"
          [showButton]="false"
        />
      }
    </div>
  `,
})
export class BrowsePokemonPageComponent {
  readonly pokemonStore = inject(PokemonStore);
  constructor() {
    this.pokemonStore.loadPokemon(this.pokemonStore.pokemonCollectionQuery);
  }
}
