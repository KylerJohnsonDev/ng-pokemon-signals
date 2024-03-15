import { Component, inject } from '@angular/core';
import { authStore } from '../auth.store';
import { AvatarComponent } from './avatar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarComponent, RouterModule],
  template: `
    <nav class="bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          routerLink="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <a class="text-xl" routerLink="/">
            <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
          </a>
        </a>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:bg-gray-900 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li>
              <a
                routerLink="/pokemon"
                routerLinkActive="bg-blue-500 md:bg-transparent md:text-blue-500"
                [routerLinkActiveOptions]="{ exact: true }"
                class="block py-2 px-3 text-white text-white rounded md:bg-transparent md:p-0"
                aria-current="page"
                >Browse</a
              >
            </li>
            <li>
              <a
                routerLink="/pokemon/bulbasaur"
                routerLinkActive="bg-blue-500 md:bg-transparent md:text-blue-500"
                class="block py-2 px-3 text-white text-white rounded md:bg-transparent md:p-0"
                aria-current="page"
                >Lookup Tool</a
              >
            </li>
            @if (authStore.session()) {
              <li>
                <a
                  routerLink="/favorite-pokemon"
                  routerLinkActive="bg-blue-500 md:bg-transparent md:text-blue-500"
                  class="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                  >Favorites</a
                >
              </li>
              <li class="hidden md:block">
                <app-avatar></app-avatar>
              </li>
              <!-- remaining list items below here are mobile view only -->
              <li class="md:hidden">
                <a
                  routerLink="/profile"
                  routerLinkActive="bg-blue-500 md:bg-transparent md:text-blue-500"
                  class="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                  >Profile</a
                >
              </li>
              <li class="md:hidden">
                <a
                  routerLink="/login"
                  (click)="authStore.signOut()"
                  class="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0e"
                  >Sign out</a
                >
              </li>
            } @else {
              <li>
                <a
                  routerLink="/login"
                  routerLinkActive="bg-blue-500 md:bg-transparent md:text-blue-500"
                  class="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                  >Sign In</a
                >
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly authStore = inject(authStore);
}
