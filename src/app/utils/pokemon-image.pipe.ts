import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImageUrlFromUrl',
  standalone: true,
})
export class PokemonImagePipe implements PipeTransform {
  // expect urls to have a trailing slash
  // example: https://pokeapi.co/api/v2/pokemon/1/
  transform(url: string) {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
