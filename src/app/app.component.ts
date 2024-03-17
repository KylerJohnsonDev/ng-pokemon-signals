import {Component, HostBinding, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from './components/button.component';
import {SignalInputDirective} from './directives/input.directive';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {PokemonStore} from './pokemon.store';
import {TitleCasePipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {authStore} from './auth.store';
import {initFlowbite} from 'flowbite';
import {NavbarComponent} from './components/navbar.component';
import {InstallPromptComponent} from "./components/install-prompt.component";
import {SmallScreenObserverStore} from "./small-screen-observer.store";

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
    InstallPromptComponent,
  ],
  providers: [PokemonStore],
  template: `
    <app-navbar/>
    <main class="flex w-full overflow-auto grow">
      <router-outlet></router-outlet>
    </main>
    @defer (when smallScreenObserver.isSmallScreen()) {
      <app-install-prompt/>
    }

  `,
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col h-full';
  readonly authStore = inject(authStore);
  readonly smallScreenObserver = inject(SmallScreenObserverStore);

  constructor() {
    initFlowbite();
  }
}
