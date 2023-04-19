import { Injectable, effect, signal, computed } from '@angular/core';
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

  readonly state = signal<PokemonState>(initialPokemonState);
  readonly pokemonId = computed(() => this.state().pokemonId);
  readonly pokemonName = computed(() => this.state().pokemonName);
  readonly pokemon = computed(() => this.state().pokemon);

  private pokemonNumberEffectRef = effect(
    () => this.fetchPokemonByRouteParam(this.pokemonId()),
    { allowSignalWrites: true }
  );

  private pokemonNameEffectRef = effect(
    () => this.fetchPokemonByRouteParam(this.pokemonName()),
    { allowSignalWrites: true }
  );

  private pokemonEffectRef = effect(() => {
    const pokemon = this.state().pokemon;
    if (pokemon) {
      this.fetchTypeInfo(pokemon.types);
    }
  });

  async fetchPokemonByRouteParam(param: number | string): Promise<void> {
    if (typeof param === 'string' && param.length < 1)
      return this.state.update((state) => ({ ...state, pokemon: null }));

    const res = await fetch(`${this.pokeApiUrl}/pokemon/${param}`);
    const pokemon = await res.json();

    this.state.update((state) => ({
      ...state,
      pokemon,
      pokemonId: pokemon.id,
      pokemonName: '',
    }));
  }

  async fetchTypeInfo(types: readonly Type[] | undefined): Promise<void> {
    if (!types) {
      this.state.update((state) => ({
        ...state,
        goodAgainst: [],
        badAgainst: [],
      }));
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
      this.state.update((state) => ({
        ...state,
        goodAgainst: Array.from(goodAgainst.values()),
        badAgainst: Array.from(badAgainst.values()),
      }));
    }
  }

  setPokemonId(id: number): void {
    const pokemonId = id < 1 ? 1 : id;
    this.state.update((state) => ({ ...state, pokemonId }));
  }

  setPokemonName(pokemonName: string): void {
    this.state.update((state) => ({ ...state, pokemonName }));
  }
}
