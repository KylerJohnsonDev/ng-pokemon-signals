import { Injectable, signal, Signal, effect, computed } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokemonSpriteUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
  private readonly pokeApiUrl = `https://pokeapi.co/api/v2/pokemon`;

  readonly pokemonNumber = signal<number>(1);
  readonly pokemon = signal<Pokemon | null>(null);
  readonly pokemonImageUrl = computed(
    () => `${this.pokemonSpriteUri}/${this.pokemon()?.id}.png`
  );

  constructor() {
    effect(() => {
      this.fetchPokemon(this.pokemonNumber());
    });
  }

  async fetchPokemon(pokemonNumber: number | null): Promise<void> {
    if (!pokemonNumber) return this.pokemon.set(null);

    const res = await fetch(`${this.pokeApiUrl}/${pokemonNumber}`);
    const pokemon = await res.json();
    this.pokemon.set(pokemon);
    this.pokemon;
  }

  setPokemonNumber(num: number): void {
    if (num < 1) return this.pokemonNumber.set(1);
    this.pokemonNumber.set(num);
  }
}
