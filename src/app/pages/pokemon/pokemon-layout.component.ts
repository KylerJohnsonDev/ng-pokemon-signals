import { Component, HostBinding, inject } from '@angular/core';

import { PokemonStore } from '../../pokemon.store';

import { MAX_POKEMON_ID } from '../../utils/pokemon-utils';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <form class="sticky w-full">
      <mat-form-field class="w-full">
        <mat-label>Pokemon Search</mat-label>
        <input
          type="text"
          placeholder="Start typing a Pokemon name..."
          aria-label="Pokemon Name Search"
          matInput
          [formControl]="pokemonSearchCtrl"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete
          autoActiveFirstOption
          #auto="matAutocomplete"
          (optionSelected)="searchForPokemon($event.option.value)"
        >
          @for (option of pokemonStore.pokemonSearchResults(); track option) {
            <mat-option [value]="option">{{ option | titlecase }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
    </form>
    <router-outlet></router-outlet>
  `,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    TitleCasePipe,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class PokemonLayoutComponent {
  @HostBinding('class') class = 'flex flex-col grow';
  pokemonSearchForm: FormGroup;
  readonly pokemonStore = inject(PokemonStore);

  get pokemonSearchCtrl(): FormControl {
    return this.pokemonSearchForm.get('pokemonSearchCtrl') as FormControl;
  }

  constructor(private fb: NonNullableFormBuilder) {
    this.pokemonSearchForm = this.fb.group({
      pokemonSearchCtrl: new FormControl(''),
    });

    this.pokemonStore.filterPokemonSearchResults(
      this.pokemonSearchCtrl.valueChanges,
    );
  }

  searchForPokemon(searchInput: string): void {
    if (searchInput.length < 3) return;
    this.pokemonStore.loadPokemonByIdentifier(searchInput);
  }
}
