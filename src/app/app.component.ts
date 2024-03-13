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

    <main class="flex w-full overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col h-full';
}
