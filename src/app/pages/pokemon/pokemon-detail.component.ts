import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonTypeLookupPipe } from './pokemon-type-lookup.pipe';
import { Pokemon, Type2 } from './pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonTypeLookupPipe],
  host: {
    class: 'flex flex-col lg:flex-row lg:items-center gap-4 p-4',
  },
  template: `
    <section class="flex flex-col items-center">
      <img
        class="h-48 lg:h-full"
        [src]="pokemon?.sprites?.other?.['official-artwork']?.front_default"
        [alt]="pokemon?.name"
      />
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-2xl capitalize mb-2">
        {{ pokemon?.name }}
      </h1>
      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p>Type:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          <ng-container *ngFor="let type of pokemon?.types">
            <span
              class="px-3 py-1 rounded-2xl text-white font-bold"
              *ngIf="type.type | pokemonTypeLookup as chipInfo"
              [ngStyle]="{ 'background-color': chipInfo.color }"
              >{{ chipInfo.label }}</span
            >
          </ng-container>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p>Good Against:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          <ng-container *ngFor="let type of goodAgainst">
            <span
              class="px-3 py-1 rounded-2xl text-white font-bold"
              *ngIf="type | pokemonTypeLookup as chipInfo"
              [ngStyle]="{ 'background-color': chipInfo.color }"
              >{{ chipInfo.label }}</span
            >
          </ng-container>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p class="grow-2">Bad Against:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          <ng-container *ngFor="let type of badAgainst">
            <span
              class="px-3 py-1 rounded-2xl text-white font-bold"
              *ngIf="type | pokemonTypeLookup as chipInfo"
              [ngStyle]="{ 'background-color': chipInfo.color }"
              >{{ chipInfo.label }}</span
            >
          </ng-container>
        </div>
      </div>
    </section>
  `,
})
export class PokemonDetailComponent {
  @Input() pokemon!: Pokemon | null;
  @Input() goodAgainst!: Type2[];
  @Input() badAgainst!: Type2[];
  @Input() pokeImageUrl!: string | null;
}
