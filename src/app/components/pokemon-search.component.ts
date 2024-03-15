import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PokemonStore } from '../pokemon.store';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    TitleCasePipe,
    ReactiveFormsModule,
    MatInputModule,
  ],
  template: `
    <form class="sticky w-full px-4">
      <mat-form-field class="w-full">
        <mat-label>Pokemon Search</mat-label>
        <input
          class="ring-0 focus:ring-0"
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
  `,
})
export class PokemonSearchComponent {
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
