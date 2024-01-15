import { Component, HostBinding, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button.component';
import { SignalInputDirective } from './directives/input.directive';
import { PokemonVersionGroupService } from './pokemon-version-group.service';
import { DropdownComponent } from './components/dropdown.component';
import { PokemonVersionGroupStore } from './pokemon-version-group.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    SignalInputDirective,
    DropdownComponent,
  ],
  template: `
    <nav class="flex p-2 bg-blue-600 items-center text-white">
      <a class="text-xl" routerLink="/">
        <img class="h-16" src="/assets/pokemon.png" alt="Pokemon" />
      </a>
      <app-dropdown
        [buttonText]="pokemonVersionGroupStore.selectedVersionGroup()?.name"
        [options]="pokemonVersionGroupStore.groupOptions()"
      />
      <div class="grow"></div>
    </nav>
    <main class="flex grow overflow-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col h-full';
  readonly pokemonVersionGroupStore = inject(PokemonVersionGroupStore);
}
