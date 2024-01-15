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
import { forkJoin, map, pipe, switchMap, tap } from 'rxjs';
import { getUniqueGoodAgainstBadAgainstTypes } from './pokemon-utils';

interface PokemonState {
  isLoading: boolean;
  pokemon: Pokemon | undefined;
  goodAgainst: string[];
  badAgainst: string[];
}

const initialPokemonState: PokemonState = {
  isLoading: false,
  pokemon: undefined,
  goodAgainst: [],
  badAgainst: [],
};

export const PokemonStore = signalStore(
  withState(initialPokemonState),
  withComputed((state) => ({
    currentPokemonIdentifier: computed(() => Number(state.pokemon()?.id)),
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
                map((typeInfoCollection: TypeInformation[]) => {
                  const { goodAgainst, badAgainst } =
                    getUniqueGoodAgainstBadAgainstTypes(typeInfoCollection);
                  patchState(state, {
                    goodAgainst,
                    badAgainst,
                    isLoading: false,
                  });
                }),
              );
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPokemonByIdentifier(1);
    },
  }),
);
