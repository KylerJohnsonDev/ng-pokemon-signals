import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { VersionGroup } from './pages/pokemon/pokemon.model';
import { PokemonVersionGroupService } from './pokemon-version-group.service';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface VersionGroupState {
  isLoading: boolean;
  versionGroups: VersionGroup[];
  selectedVersionGroup: VersionGroup | undefined;
}

const initialVersionGroupState: VersionGroupState = {
  isLoading: false,
  versionGroups: [],
  selectedVersionGroup: undefined,
};

export const PokemonVersionGroupStore = signalStore(
  { providedIn: 'root' },
  withState(initialVersionGroupState),
  withComputed(({ versionGroups }) => ({
    groupOptions: computed(() => {
      return versionGroups().map((group) => ({
        label: group.name,
        value: group,
      }));
    }),
  })),
  withMethods(
    (
      state,
      pokemonVersionGroupService = inject(PokemonVersionGroupService),
    ) => ({
      loadPokemonVersionGroups: rxMethod<void>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap(() => {
            return pokemonVersionGroupService.loadPokemonVersionGroups().pipe(
              tap((versionGroups) => {
                const selectedVersionGroup =
                  versionGroups[versionGroups.length - 1];
                patchState(state, {
                  versionGroups: versionGroups ?? [],
                  selectedVersionGroup,
                  isLoading: false,
                });
              }),
            );
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store.loadPokemonVersionGroups();
    },
  }),
);
