import { Component, inject } from '@angular/core';
import { authStore } from '../auth.store';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [RouterModule, JsonPipe],
  template: ` <div
      class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
    >
      <svg
        class="absolute w-12 h-12 text-gray-400 -left-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>

    <div
      id="userDropdown"
      class="z-10 hidden divide-y rounded-lg shadow w-44 bg-gray-800 divide-gray-600"
    >
      <div class="px-4 py-3 text-sm text-white">
        <div class="font-medium truncate">
          {{ authStore.user()?.email ?? 'anonymous@whoknows.com' }}
        </div>
      </div>
      <ul class="py-2 text-sm text-gray-200" aria-labelledby="avatarButton">
        <li>
          <a
            routerLink="/profile"
            class="block px-4 py-2 hover:bg-gray-600 hover:text-white"
            >Profile</a
          >
        </li>
      </ul>
      <div class="py-1">
        <a
          routerLink="/login"
          (click)="authStore.signOut()"
          class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
          >Sign out</a
        >
      </div>
    </div>`,
})
export class AvatarComponent {
  readonly authStore = inject(authStore);
}
