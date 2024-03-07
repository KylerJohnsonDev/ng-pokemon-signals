import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { SignalInputDirective } from 'src/app/directives/input.directive';
import { PokemonStore } from './pokemon.store';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PaginatorComponent } from 'src/app/components/paginator.component';
import { ErrorBannerComponent } from 'src/app/components/error-banner.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MAX_POKEMON_ID } from './pokemon-utils';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <main class="grow overflow-auto">
      @if (pokemonStore.errors().length > 0) {
        <app-error-banner [errorMessages]="pokemonStore.errors()" />
      }
      <form class="fixed w-full">
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

      <app-pokemon-detail class="m-4"></app-pokemon-detail>
    </main>
    <footer>
      <app-paginator
        [isMobile]="true"
        (previous)="onPrevious()"
        (reset)="pokemonStore.loadPokemonByIdentifier(1)"
        (next)="onNext()"
      />
    </footer>
  `,
  imports: [
    CommonModule,
    ButtonComponent,
    PokemonDetailComponent,
    SignalInputDirective,
    PaginatorComponent,
    ErrorBannerComponent,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
  ],
})
export class PokemonComponent {
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

  onPrevious(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier > 1) {
      const previousPokemonId = identifier - 1;
      this.pokemonStore.loadPokemonByIdentifier(previousPokemonId);
    }
  }

  onNext(): void {
    const identifier = this.pokemonStore.currentPokemonIdentifier();
    if (identifier < MAX_POKEMON_ID) {
      const nextPokemonId = identifier + 1;
      this.pokemonStore.loadPokemonByIdentifier(nextPokemonId);
    }
  }
}
