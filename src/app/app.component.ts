import { Component, HostBinding, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button.component';
import { SignalInputDirective } from './directives/input.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { PokemonStore } from './pokemon.store';
import { TitleCasePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    SignalInputDirective,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TitleCasePipe,
    MatInputModule,
  ],
  providers: [PokemonStore],
  template: `
    <nav class="flex p-2 bg-blue-600 items-center text-white">
      <a class="text-xl" routerLink="/">
        <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
      </a>
      <div class="grow"></div>
    </nav>

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

    <main class="flex grow overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col h-full';
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
    console.log(searchInput);
    if (searchInput.length < 3) return;
    this.pokemonStore.loadPokemonByIdentifier(searchInput);
  }
}
