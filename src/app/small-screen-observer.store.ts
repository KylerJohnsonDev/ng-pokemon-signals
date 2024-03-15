import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {computed, inject} from "@angular/core";
import {tap} from "rxjs";

interface SmallScreenObserverState {
  isSmallScreen: boolean;
}

const initialState: SmallScreenObserverState = {
  isSmallScreen: true,
}

export const SmallScreenObserverStore = signalStore(
  {providedIn: 'root'},
  withState<SmallScreenObserverState>(initialState),
  withComputed((state) => ({
    isSmallScreen : computed(() => state.isSmallScreen)
  })),
  withMethods((state, breakpointObserver = inject(BreakpointObserver)) => ({
      getIsSmallScreen: rxMethod(() => {
        return breakpointObserver.observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
        ]).pipe(
          tap((result) => {
            patchState(state, {isSmallScreen: result.matches});
          }),
        );
      }),
    }
  ))
);
