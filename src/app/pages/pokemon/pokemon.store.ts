import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Pokemon, TypeInformation } from './pokemon.model';
import { computed, inject } from '@angular/core';
import { PokemonService } from './pokemon.service';
import {
  EMPTY,
  Observable,
  catchError,
  debounce,
  debounceTime,
  forkJoin,
  map,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  getUniqueGoodAgainstBadAgainstTypes,
  pokemonNames,
} from './pokemon-utils';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

interface PokemonState {
  isLoading: boolean;
  pokemon: Pokemon | undefined;
  goodAgainst: string[];
  badAgainst: string[];
  loadPokemonError: string | undefined;
  loadTypesError: string | undefined;
  pokemonSearchResults: string[];
}

const initialPokemonState: PokemonState = {
  isLoading: false,
  pokemon: undefined,
  goodAgainst: [],
  badAgainst: [],
  loadPokemonError: undefined,
  loadTypesError: undefined,
  pokemonSearchResults: [...pokemonNames],
};

export const PokemonStore = signalStore(
  withState(initialPokemonState),
  withComputed((state) => ({
    currentPokemonIdentifier: computed(() => Number(state.pokemon()?.id)),
    errors: computed(() => {
      const errors: string[] = [];
      if (state.loadPokemonError()) {
        errors.push(state.loadPokemonError() as string);
      }
      if (state.loadTypesError()) {
        errors.push(state.loadTypesError() as string);
      }
      return errors;
    }),
  })),
  withMethods((state, pokemonService = inject(PokemonService)) => ({
    loadPokemonByIdentifier: rxMethod<string | number>(
      pipe(
        tap(() => patchState(state, { isLoading: true })),
        switchMap((identifier) =>
          pokemonService.loadPokemonByIdentifier(identifier).pipe(
            tap((pokemon) => patchState(state, { pokemon })),
            switchMap((pokemon) => {
              const types = pokemon.types.map((type) => type.type.name);
              const sources = types.map((type) =>
                pokemonService.loadTypeInfo(type),
              );
              return forkJoin(sources).pipe(
                tapResponse(
                  (typeInfoCollection: TypeInformation[]) => {
                    const { goodAgainst, badAgainst } =
                      getUniqueGoodAgainstBadAgainstTypes(typeInfoCollection);
                    patchState(state, {
                      goodAgainst,
                      badAgainst,
                      isLoading: false,
                    });
                  },
                  (error: HttpErrorResponse) => {
                    console.error('Error loading type info', error);
                    const loadTypesError = `Unable to load type advantages/disadvantages. Error: ${error.message}`;
                    patchState(state, { loadTypesError, isLoading: false });
                  },
                ),
              );
            }),
            catchError((error: HttpErrorResponse) => {
              console.error('Error loading pokemon', error);
              const loadPokemonError = `Unable to load pokemon. Error: ${error.message}`;
              patchState(state, { loadPokemonError, isLoading: false });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    filterPokemonSearchResults: rxMethod<string>(
      pipe(
        debounceTime(300),
        tap((searchInput) => {
          if (searchInput.length < 3) return;
          const filteredResults = pokemonNames.filter((name) =>
            name.toLowerCase().includes(searchInput.toLowerCase()),
          );
          patchState(state, { pokemonSearchResults: filteredResults });
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPokemonByIdentifier(1);
    },
  }),
);
