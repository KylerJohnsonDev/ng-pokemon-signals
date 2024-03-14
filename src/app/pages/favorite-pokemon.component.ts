import { Component, inject } from '@angular/core';
import { PokemonStore } from '../pokemon.store';
import { authStore } from '../auth.store';
import { CardComponent } from '../components/card.component';

@Component({
  selector: 'app-favorite-pokemon',
  standalone: true,
  imports: [CardComponent],
  host: {
    class: 'h-full w-full flex items-center justify-center',
  },
  template: `
    @if (pokemonStore.favoritePokemon().length === 0) {
      <h1 class="text-4xl font-bold">No favorite Pokemon</h1>
    } @else {
      <div
        class="grid grid-cols-2 auto-rows-min md:grid-cols-3 gap-4 p-4 justify-items-center"
      >
        @for (pokemon of pokemonStore.favoritePokemon(); track pokemon.id) {
          <app-card
            [imageUrl]="pokemon.url_to_pokemon_image"
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
