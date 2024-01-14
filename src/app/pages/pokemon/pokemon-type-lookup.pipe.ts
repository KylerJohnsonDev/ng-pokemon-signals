import { Pipe, PipeTransform } from '@angular/core';
import { Type2, TypeChipDefinition } from './pokemon.model';

const pokemonTypeColorsMap = new Map<string, TypeChipDefinition>([
  ['normal', { label: 'Normal', color: '#A8A77A' }],
  ['fire', { label: 'Fire', color: '#EE8130' }],
  ['water', { label: 'Water', color: '#6390F0' }],
  ['electric', { label: 'Electric', color: '#F7D02C' }],
  ['grass', { label: 'Grass', color: '#7AC74C' }],
  ['ice', { label: 'Ice', color: '#96D9D6' }],
  ['fighting', { label: 'Fighting', color: '#C22E28' }],
  ['poison', { label: 'Poison', color: '#A33EA1' }],
  ['ground', { label: 'Ground', color: '#E2BF65' }],
  ['flying', { label: 'Flying', color: '#A98FF3' }],
  ['psychic', { label: 'Psychic', color: '#F95587' }],
  ['bug', { label: 'Bug', color: '#A6B91A' }],
  ['rock', { label: 'Rock', color: '#B6A136' }],
  ['ghost', { label: 'Ghost', color: '#735797' }],
  ['dragon', { label: 'Dragon', color: '#6F35FC' }],
  ['dark', { label: 'Dark', color: '#705746' }],
  ['steel', { label: 'Steel', color: '#B7B7CE' }],
  ['fairy', { label: 'Fairy', color: '#D685AD' }],
]);

@Pipe({
  name: `pokemonTypeLookup`,
  standalone: true,
})
export class PokemonTypeLookupPipe implements PipeTransform {
  transform(type: string | null | undefined): TypeChipDefinition {
    const unknown: TypeChipDefinition = { label: 'Unknown', color: '#A8A77A' };
    if (!type) unknown;

    const typeChipDef = pokemonTypeColorsMap.get(String(type));
    return typeChipDef ? typeChipDef : unknown;
  }
}
