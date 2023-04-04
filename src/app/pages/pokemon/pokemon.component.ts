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
  host: {
    class: 'flex flex-col grow',
  },
  template: `
    <main class="grow overflow-auto">
      <section class="lg:hidden flex flex-row m-4">
        <input
          class="app-input grow"
          type="text"
          placeholder="Enter a Pokemon"
          [(ngModel)]="pokemonNameInputValue"
          (keyup.enter)="onEnter()"
        />
      </section>
      <app-pokemon-detail
        class="m-4"
        *ngIf="pokemonStore.pokemon()"
        [pokemon]="pokemonStore.pokemon()"
        [goodAgainst]="pokemonStore.goodAgainst()"
        [badAgainst]="pokemonStore.badAgainst()"
        [pokeImageUrl]="pokemonStore.pokemonImageUrl()"
      ></app-pokemon-detail>
      <section class="hidden lg:flex flex-row mb-4 lg:w-72 gap-2 mx-4">
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
      <section class="hidden lg:flex w-72 flex-row m-4">
        <input
          class="app-input grow"
          type="text"
          placeholder="Enter a Pokemon"
          [(ngModel)]="pokemonNameInputValue"
          (keyup.enter)="onEnter()"
        />
      </section>
    </main>
    <footer class="flex flex-row lg:hidden bg-white gap-0.5">
      <button
        class="font-bold grow py-2 px-4 bg-blue-500"
        (click)="onPrevious()"
      >
        Previous
      </button>
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="onReset()">
        Reset
      </button>
      <button class="font-bold grow py-2 px-4 bg-blue-500" (click)="onNext()">
        Next
      </button>
    </footer>
  `,
  imports: [CommonModule, ButtonComponent, PokemonDetailComponent, FormsModule],
})
export class PokemonComponent {
  pokemonNameInputValue: string = '';
  constructor(public pokemonStore: PokemonStore) {}

  onEnter(): void {
    this.pokemonStore.pokemonName.set(this.pokemonNameInputValue);
  }

  onPrevious(): void {
    this.pokemonStore.setPokemonNumber(this.pokemonStore.pokemonNumber() - 1);
  }

  onReset(): void {
    this.pokemonStore.setPokemonNumber(1);
  }

  onNext(): void {
    this.pokemonStore.setPokemonNumber(this.pokemonStore.pokemonNumber() + 1);
  }
}
