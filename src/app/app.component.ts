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
import { authStore } from './auth.store';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './components/navbar.component';

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
    NavbarComponent,
  ],
  providers: [PokemonStore],
  template: `
    <app-navbar />
    <!-- <nav class="flex p-2 bg-slate-800 items-center text-white gap-6">
      <a class="text-xl" routerLink="/">
        <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
      </a>
      <div class="grow"></div>
      <a
        routerLink="/pokemon/type-tool"
        routerLinkActive="border-b-[1px] border-white rounded-none px-0"
      >
        Type Tool
      </a>
      @if (authStore.session()) {
        <a
          routerLink="/favorite-pokemon"
          routerLinkActive="border-b-[1px] border-white rounded-none px-0"
        >
          Favorites
        </a>
        <a
          routerLink="/profile"
          routerLinkActive="border-b-[1px] border-white rounded-none px-0"
          >Profile</a
        >
        <app-button
          text="Sign Out"
          class="ml-4"
          (click)="authStore.signOut()"
        />
      } @else {
        <a routerLink="/login" class="bg-gray-900 py-2 px-4 rounded ml-4"
          >Login</a
        >
      }
    </nav> -->

    <main class="flex w-full overflow-auto grow">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  readonly authStore = inject(authStore);

  constructor() {
    initFlowbite();
  }
}
