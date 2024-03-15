import { Component, inject } from '@angular/core';
import { PokemonStore } from '../pokemon.store';
import { authStore } from '../auth.store';
import { CardComponent } from '../components/card.component';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [CardComponent],
  host: {
    class: 'h-full w-full',
  },
  template: `
    @if (pokemonStore.favoritePokemon().length === 0) {
      <h1 class="text-4xl font-bold">No favorite Pokemon</h1>
    } @else {
      <div
        class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
      >
        @for (pokemon of pokemonStore.favoritePokemon(); track pokemon.id) {
          <app-card
            class="h-auto max-w-full"
            [imageUrl]="pokemon.url_to_pokemon_image"
            [cardClickUrl]="'/pokemon/' + pokemon.pokemon_name"
            [imageAlt]="pokemon.pokemon_name"
            [title]="pokemon.pokemon_name"
            buttonText="Remove"
            (buttonClick)="pokemonStore.RemoveFromFavorites(pokemon)"
          />
        }
      </div>
    }
  `,
})
export class FavoritePokemonPageComponent {
  readonly pokemonStore = inject(PokemonStore);
  readonly authStore = inject(authStore);
  constructor() {
    this.pokemonStore.loadFavoritePokemon(
      this.authStore.session()?.user.id ?? '',
    );
  }
}
