import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { PokemonStore } from './pokemon.store';
import { PokemonTypeLookupPipe } from '../../utils/pokemon-type-lookup.pipe';
import { TypePillComponent } from 'src/app/components/type-pill.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonTypeLookupPipe, ButtonComponent, TypePillComponent],
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
          (click)="onPrevious()"
        ></app-button>
        <app-button
          text="Reset"
          (click)="pokemonStore.resetState()"
        ></app-button>
        <app-button
          text="Next"
          (click)="onNext()"
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
          @for(type of pokemonStore.pokemon()?.types; track type.type.name) {
            <app-type-pill [text]="type.type.name"></app-type-pill>
          } 
          @empty {
            <span>No Data</span>
          }
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p>Good Against:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          @for(type of pokemonStore.goodAgainst(); track type) {
            <app-type-pill [text]="type"></app-type-pill>
          } @empty {
            <span>No Data</span>
          }
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <p class="grow-2">Bad Against:</p>
        <div class="flex flex-row flex-wrap gap-2 max-w-full">
          @for(type of pokemonStore.badAgainst(); track type) {
            <app-type-pill [text]="type"></app-type-pill>
          } @empty {
            <span>No Data</span>
          }
        </div>
      </div>
    </section>
  `,
})
export class PokemonDetailComponent {
  readonly pokemonStore = inject(PokemonStore);

  onPrevious(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if(identifier > 1) {
      const previousPokemonId = identifier - 1;
      this.pokemonStore.loadPokemonByIdentifier(previousPokemonId)
    }
  }

  onNext (): void {
    const maxNumberOfPokemon = 1024;
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if(identifier < maxNumberOfPokemon) {
      const nextPokemonId = identifier + 1;
      this.pokemonStore.loadPokemonByIdentifier(nextPokemonId)
    }
  }
}
