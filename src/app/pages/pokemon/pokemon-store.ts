import { Injectable, computed, effect, signal } from '@angular/core';
import { Pokemon, Type, Type2, TypeInformation } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokemonSpriteUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
  private readonly pokeApiUrl = `https://pokeapi.co/api/v2`;

  readonly pokemonNumber = signal<number>(1);
  readonly pokemonName = signal<string>('');
  readonly pokemon = signal<Pokemon | null>(null);
  readonly pokemonImageUrl = computed(
    () => `${this.pokemonSpriteUri}/${this.pokemon()?.id}.png`
  );
  readonly goodAgainst = signal<Type2[]>([]);
  readonly badAgainst = signal<Type2[]>([]);

  constructor() {
    effect(() => {
      this.fetchPokemon(this.pokemonNumber());
    });

    effect(() => {
      this.fetchPokemon(this.pokemonName());
    });

    effect(() => {
      if (this.pokemon()) {
        this.fetchTypeInfo(this.pokemon()?.types);
      }
    });
  }

  async fetchPokemon(
    pokemonNameOrNumber: number | string | null
  ): Promise<void> {
    if (!pokemonNameOrNumber) return this.pokemon.set(null);

    const res = await fetch(
      `${this.pokeApiUrl}/pokemon/${pokemonNameOrNumber}`
    );
    const pokemon = await res.json();
    this.pokemon.set(pokemon);
  }

  async fetchTypeInfo(types: readonly Type[] | undefined): Promise<void> {
    if (!types) {
      this.goodAgainst.set([]);
      this.badAgainst.set([]);
    } else {
      const requestsToMake = types.map((type: Type) => {
        return fetch(`${this.pokeApiUrl}/type/${type.type.name}`);
      });
      const responses = await Promise.all(requestsToMake);
      const typeInfoCollection: TypeInformation[] = await Promise.all(
        responses.map((response) => {
          return response.json();
        })
      );

      let goodAgainst: Type2[] = [];
      let badAgainst: Type2[] = [];

      typeInfoCollection.forEach((typeInfo) => {
        goodAgainst = [
          ...goodAgainst,
          ...typeInfo.damage_relations.double_damage_to,
        ];
        badAgainst = [
          ...badAgainst,
          ...typeInfo.damage_relations.double_damage_from,
        ];
      });

      this.goodAgainst.set(goodAgainst);
      this.badAgainst.set(badAgainst);
    }
  }

  setPokemonNumber(num: number): void {
    if (num < 1) return this.pokemonNumber.set(1);
    this.pokemonNumber.set(num);
  }
}
