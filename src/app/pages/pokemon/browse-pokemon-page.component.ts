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
    <div class="flex flex-wrap gap-4 justify-center my-4">
      @for (item of pokemonStore.pokemonCollection(); track item.name) {
        <app-card
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
