import { Injectable, effect, signal } from '@angular/core';
import {
  Pokemon,
  Type,
  Type2,
  TypeInformation,
} from '../pages/pokemon/pokemon.model';

interface PokemonState {
  pokemonId: number;
  pokemonName: string;
  pokemon: Pokemon | null;
  goodAgainst: Type2[];
  badAgainst: Type2[];
}

const initialPokemonState: PokemonState = {
  pokemonId: 1,
  pokemonName: '',
  pokemon: null,
  goodAgainst: [],
  badAgainst: [],
};

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokeApiUrl = `https://pokeapi.co/api/v2`;

  readonly pokemonId = signal<number>(1);
  readonly pokemonName = signal<string>('');
  readonly pokemon = signal<Pokemon | null>(null);
  readonly typeStrategyInfo = signal<{
    goodAgainst: Type2[];
    badAgainst: Type2[];
  }>({ goodAgainst: [], badAgainst: [] });

  private pokemonNumberEffectRef = effect(
    () => this.fetchPokemonByRouteParam(this.pokemonId()),
    { allowSignalWrites: true }
  );

  private pokemonNameEffectRef = effect(
    () => this.fetchPokemonByRouteParam(this.pokemonName()),
    { allowSignalWrites: true }
  );

  private pokemonEffectRef = effect(() => {
    const pokemon = this.pokemon();
    if (pokemon) {
      this.fetchTypeInfo(pokemon.types);
    }
  });

  async fetchPokemonByRouteParam(param: number | string): Promise<void> {
    if (typeof param === 'string' && param.length < 1) return;

    const res = await fetch(`${this.pokeApiUrl}/pokemon/${param}`);
    const pokemon = await res.json();

    this.pokemonId.set(pokemon.id);
    this.pokemon.set(pokemon);
    this.pokemonName.set('');
  }

  async fetchTypeInfo(types: readonly Type[] | undefined): Promise<void> {
    if (!types) {
      this.typeStrategyInfo.set({
        goodAgainst: [],
        badAgainst: [],
      });
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

      let goodAgainst = new Map<string, Type2>();
      let badAgainst = new Map<string, Type2>();

      typeInfoCollection.forEach((typeInfo) => {
        typeInfo.damage_relations.double_damage_to.forEach((type) => {
          if (goodAgainst.has(type.name)) return;
          goodAgainst.set(type.name, type);
        });

        typeInfo.damage_relations.double_damage_from.forEach((type) => {
          if (badAgainst.has(type.name)) return;
          badAgainst.set(type.name, type);
        });
      });
      this.typeStrategyInfo.set({
        goodAgainst: Array.from(goodAgainst.values()),
        badAgainst: Array.from(badAgainst.values()),
      });
    }
  }

  setPokemonId(id: number): void {
    const pokemonId = id < 1 ? 1 : id;
    this.pokemonId.set(pokemonId);
  }

  setPokemonName(pokemonName: string): void {
    this.pokemonName.set(pokemonName);
  }
}
