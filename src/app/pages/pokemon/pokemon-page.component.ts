import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button.component';
import { SignalInputDirective } from 'src/app/directives/input.directive';
import { PokemonStore } from '../../pokemon.store';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PaginatorComponent } from 'src/app/components/paginator.component';
import { ErrorBannerComponent } from 'src/app/components/error-banner.component';
import { MAX_POKEMON_ID } from '../../utils/pokemon-utils';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <main class="grow overflow-auto">
      @if (pokemonStore.errors().length > 0) {
        <app-error-banner [errorMessages]="pokemonStore.errors()" />
      }

      <app-pokemon-detail class="m-4" />
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
  ],
})
export class PokemonComponent {
  @HostBinding('class') class = 'flex flex-col grow';
  readonly pokemonStore = inject(PokemonStore);

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
