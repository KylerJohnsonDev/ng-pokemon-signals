import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { PokemonStore } from '../../global-state/pokemon-store';
import { PokemonTypeLookupPipe } from './pokemon-type-lookup.pipe';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonTypeLookupPipe, ButtonComponent],
  host: {
    class: 'flex flex-col lg:flex-row lg:items-center gap-4 p-4',
  },
  template: `
    <section class="flex flex-col items-center">
      <img
        class="h-48 lg:h-96"
        [src]="pokemonStore.pokemon()?.sprites?.other?.['official-artwork']?.front_default"
        [alt]="pokemonStore.pokemon()?.name"
      />
      <section class="hidden lg:flex flex-row mb-4 lg:w-72 gap-2 mx-4">
        <app-button
          text="Previous"
          (click)="
            pokemonStore.setPokemonNumber(pokemonStore.pokemonNumber() - 1)
          "
        ></app-button>
        <app-button
          text="Reset"
          (click)="pokemonStore.setPokemonNumber(1)"
        ></app-button>
        <app-button
          text="Next"
          (click)="
            pokemonStore.setPokemonNumber(pokemonStore.pokemonNumber() + 1)
          "
        >
        </app-button>
      </section>
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-2xl capitalize mb-2">
        {{ pokemonStore.pokemon()?.name }}
      </h1>
      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p>Type:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          <ng-container *ngFor="let type of pokemonStore.pokemon()?.types">
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
          <ng-container *ngFor="let type of pokemonStore.goodAgainst()">
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
          <ng-container *ngFor="let type of pokemonStore.badAgainst()">
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
  constructor(public pokemonStore: PokemonStore) {}
}
