import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonTypeLookupPipe } from './pokemon-type-lookup.pipe';
import { Pokemon, Type2 } from './pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonTypeLookupPipe],
  host: {
    class: 'flex flex-row items-center gap-4 p-4',
  },
  template: `
    <section class="flex flex-col items-center">
      <img
        [src]="pokemon?.sprites?.other?.['official-artwork']?.front_default"
        [alt]="pokemon?.name"
        width="200"
        height="200"
      />
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-2xl capitalize mb-2">
        {{ pokemon?.name }}
      </h1>
      <p>
        Type:
        <ng-container *ngFor="let item of pokemon?.types">
          <span
            class="px-3 py-1 rounded-2xl text-white ml-2 font-bold"
            *ngIf="item.type | pokemonTypeLookup as type"
            [ngStyle]="{ 'background-color': type.color }"
            >{{ type.label }}</span
          >
        </ng-container>
      </p>
      <p>
        Good Against:
        <ng-container *ngFor="let type of goodAgainst">
          <span
            class="px-3 py-1 rounded-2xl text-white ml-2 font-bold"
            *ngIf="type | pokemonTypeLookup as chipInfo"
            [ngStyle]="{ 'background-color': chipInfo.color }"
            >{{ chipInfo.label }}</span
          >
        </ng-container>
      </p>
      <p>
        Bad Against:
        <ng-container *ngFor="let type of badAgainst">
          <span
            class="px-3 py-1 rounded-2xl text-white ml-2 font-bold"
            *ngIf="type | pokemonTypeLookup as chipInfo"
            [ngStyle]="{ 'background-color': chipInfo.color }"
            >{{ chipInfo.label }}</span
          >
        </ng-container>
      </p>
    </section>
  `,
})
export class PokemonDetailComponent {
  @Input() pokemon!: Pokemon | null;
  @Input() goodAgainst!: Type2[];
  @Input() badAgainst!: Type2[];
  @Input() pokeImageUrl!: string | null;
}
