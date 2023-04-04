import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button.component';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonStore } from './pokemon-store';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  providers: [PokemonStore],
  template: `
    <app-pokemon-detail
      class="m-4"
      *ngIf="pokemonStore.pokemon()"
      [pokemon]="pokemonStore.pokemon()"
      [goodAgainst]="pokemonStore.goodAgainst()"
      [badAgainst]="pokemonStore.badAgainst()"
      [pokeImageUrl]="pokemonStore.pokemonImageUrl()"
    ></app-pokemon-detail>
    <section class="flex flex-row mb-4 w-72 gap-2 mx-4">
      <app-button
        text="Previous"
        (click)="
          pokemonStore.setPokemonNumber(pokemonStore.pokemonNumber() - 1)
        "
      ></app-button>
      <app-button
        text="Next"
        (click)="
          pokemonStore.setPokemonNumber(pokemonStore.pokemonNumber() + 1)
        "
      >
      </app-button>
      <app-button
        text="Reset"
        (click)="pokemonStore.setPokemonNumber(1)"
      ></app-button>
    </section>
    <section class="w-72 gap-2 flex flex-row m-4 items-baseline">
      <span class="w-16 text-lg">Go to:</span>
      <input
        class="app-input"
        type="number"
        [value]="pokemonStore.pokemonNumber()"
        (input)="onInput($event)"
      />
    </section>
  `,
  imports: [CommonModule, ButtonComponent, PokemonDetailComponent, FormsModule],
})
export class PokemonComponent {
  constructor(public pokemonStore: PokemonStore) {}

  onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const num = Number(input.value);
    this.pokemonStore.setPokemonNumber(num);
  }
}
