import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Signal,
  effect,
  inject,
  model,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonStore } from '../pokemon.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  template: `
    <div class="max-w-md mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium sr-only text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          autocomplete="off"
          [formControl]="searchValueCtrl"
          (keydown)="onKeyDown($event)"
          type="text"
          #searchInput
          id="pokemon-search"
          [ngClass]="{
            'rounded-t-lg': isResultsVisible(),
            'rounded-lg': !isResultsVisible()
          }"
          class="block w-full p-4 ps-10 text-sm border rounded-t-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for a Pokémon"
        />
        <button
          type="button"
          class="absolute inset-y-0 end-0 flex items-center pe-3 hidden lg:block"
        >
          <kbd class="font-semibold text-xs text-gray-100">CTRL K</kbd>
        </button>
      </div>
    </div>

    <div
      [ngClass]="{ hidden: !isResultsVisible() }"
      class="max-w-md mx-auto h-fit max-h-48 overflow-scroll text-sm font-medium border rounded-b-lg bg-gray-700 border-gray-600 text-white"
    >
      @for (pokemon of pokemonStore.pokemonSearchResults(); track pokemon) {
        <span
          (click)="onClickResult(pokemon)"
          #result
          class="block w-full px-4 py-2 border-b cursor-pointer  focus:outline-none focus:ring-2 border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500 focus:text-white"
        >
          {{ pokemon }}
        </span>
      } @empty {
        <span
          class="block w-full px-4 py-2 border-b cursor-pointer  focus:outline-none focus:ring-2 border-gray-600  focus:ring-gray-500 focus:text-white"
        >
          No results
        </span>
      }
    </div>
  `,
  styles: `
    .highlighted {
      @apply bg-gray-600;
    }
  `,
})
export class Search {
  isResultsVisible = model<boolean>(false);
  inputElement: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild('searchInput');
  resultElements: Signal<ReadonlyArray<ElementRef>> = viewChildren('result');

  searchValueCtrl = new FormControl<string>('', { nonNullable: true });

  readonly pokemonStore = inject(PokemonStore);

  constructor(private router: Router) {
    this.pokemonStore.filterPokemonSearchResults(
      this.searchValueCtrl.valueChanges,
    );
  }

  focuInputElement(): void {
    this.inputElement()?.nativeElement.focus();
    this.isResultsVisible.update(() => true);
  }

  onKeyDown(e: Event): void {
    if (e instanceof KeyboardEvent && e.key === 'Escape') {
      this.isResultsVisible.update(() => false);
    }
    if (e instanceof KeyboardEvent && e.key === 'ArrowDown') {
      const isAnyResultHighlighted = this.resultElements().some((el) => {
        return Array.from(el.nativeElement.classList).includes('highlighted');
      });
      if (!isAnyResultHighlighted) {
        this.resultElements()[0].nativeElement.classList.add('highlighted');
      }
      if (isAnyResultHighlighted) {
        const highlightedIndex = this.resultElements().findIndex((el) => {
          return el.nativeElement.classList.contains('highlighted');
        });

        this.resultElements()[highlightedIndex].nativeElement.classList.remove(
          'highlighted',
        );
        const lastElementIndex = this.resultElements().length - 1;
        const newIndex =
          highlightedIndex + 1 > lastElementIndex
            ? lastElementIndex
            : highlightedIndex + 1;
        this.resultElements()[newIndex].nativeElement.classList.add(
          'highlighted',
        );
        this.resultElements()[newIndex].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
    if (e instanceof KeyboardEvent && e.key === 'ArrowUp') {
      const isAnyResultHighlighted = this.resultElements().some((el) => {
        return Array.from(el.nativeElement.classList).includes('highlighted');
      });
      if (!isAnyResultHighlighted) {
        return;
      }
      if (isAnyResultHighlighted) {
        const highlightedIndex = this.resultElements().findIndex((el) => {
          return Array.from(el.nativeElement.classList).includes('highlighted');
        });
        this.resultElements()[highlightedIndex].nativeElement.classList.remove(
          'highlighted',
        );
        const newIndex = highlightedIndex - 1 < 0 ? 0 : highlightedIndex - 1;
        this.resultElements()[newIndex].nativeElement.classList.add(
          'highlighted',
        );
        this.resultElements()[newIndex].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
    if (e instanceof KeyboardEvent && e.key === 'Enter') {
      const highlightedIndex = this.resultElements().findIndex((el) => {
        return Array.from(el.nativeElement.classList).includes('highlighted');
      });
      this.searchValueCtrl.setValue('');
      const highlightedElement = this.resultElements()[highlightedIndex];
      this.resultElements()[highlightedIndex].nativeElement.classList.remove(
        'highlighted',
      );
      this.isResultsVisible.update(() => false);
      this.router.navigate([
        '/pokemon',
        highlightedElement.nativeElement.textContent.trim(),
      ]);
    }
  }

  onClickResult(pokemon: string): void {
    this.searchValueCtrl.setValue('');
    this.isResultsVisible.update(() => false);
    this.router.navigate(['/pokemon', pokemon]);
  }
}
