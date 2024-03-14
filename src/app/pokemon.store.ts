import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FavoritePokemon, Pokemon, TypeInformation } from './pokemon.model';
import { computed, effect, inject } from '@angular/core';
import { PokemonService } from './pokemon.service';
import {
  EMPTY,
  catchError,
  concatMap,
  debounceTime,
  forkJoin,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  getUniqueGoodAgainstBadAgainstTypes,
  pokemonNames,
} from './utils/pokemon-utils';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { authStore } from './auth.store';

interface PokemonState {
  isLoading: boolean;
  pokemon: Pokemon | undefined;
  goodAgainst: string[];
  badAgainst: string[];
  loadPokemonError: string | undefined;
  loadTypesError: string | undefined;
  pokemonSearchResults: string[];
  favoritePokemon: FavoritePokemon[];
}

const initialPokemonState: PokemonState = {
  isLoading: false,
  pokemon: undefined,
  goodAgainst: [],
  badAgainst: [],
  loadPokemonError: undefined,
  loadTypesError: undefined,
  pokemonSearchResults: [...pokemonNames],
  favoritePokemon: [],
};

export const PokemonStore = signalStore(
  { providedIn: 'root' },
  withState(initialPokemonState),
  withComputed((state) => ({
    currentPokemonIdentifier: computed(() => Number(state.pokemon()?.id)),
    isFavorite: computed(() => {
      const pokemonId = state.pokemon()?.id;
      const isFavorite = state
        .favoritePokemon()
        .some((fav) => fav?.pokemon_id === pokemonId);
      console.log(isFavorite, typeof pokemonId);
      return isFavorite;
    }),
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
  withMethods(
    (
      state,
      pokemonService = inject(PokemonService),
      _authStore = inject(authStore),
    ) => ({
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
            const filteredResults = pokemonNames.filter((name) =>
              name.toLowerCase().includes(searchInput.toLowerCase()),
            );
            patchState(state, { pokemonSearchResults: filteredResults });
          }),
        ),
      ),
      addToFavorites: async (pokemon: Pokemon) => {
        try {
          const addedFavoritePokemon =
            await pokemonService.addPokemonToFavorites(
              pokemon,
              _authStore.session()?.user.id ?? '',
            );
          console.log(addedFavoritePokemon);
          const favoritePokemon = [
            ...state.favoritePokemon(),
            addedFavoritePokemon,
          ];
          patchState(state, { favoritePokemon });
        } catch (e) {
          console.error('Error adding pokemon to favorites', e);
        }
      },
      loadFavoritePokemon: async (userId: string) => {
        const favoritePokemon = await pokemonService.getFavoritePokemon(userId);
        patchState(state, { favoritePokemon });
      },
      RemoveFromFavorites: async (pokemon: FavoritePokemon) => {
        try {
          await pokemonService.removePokemonFromFavorites(pokemon);
          const favoritePokemon = state
            .favoritePokemon()
            .filter((fav) => fav.id !== pokemon.id);
          patchState(state, { favoritePokemon });
        } catch (e) {
          console.error('Error removing pokemon from favorites', e);
        }
      },
    }),
  ),
  withHooks({
    onInit(store, _authStore = inject(authStore)) {
      store.loadPokemonByIdentifier(1);
      store.loadFavoritePokemon(_authStore.session()?.user.id ?? '');
      // debug
      effect(() => {
        console.log(getState(store));
      });
    },
  }),
);
