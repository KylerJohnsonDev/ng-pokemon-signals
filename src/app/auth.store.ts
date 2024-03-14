import { effect, inject } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  AuthSession,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface AuthState {
  supabaseClient: SupabaseClient | null;
  session: AuthSession | null;
  user: User | null;
  errorMessage: string | null;
}

const initialAuthState: AuthState = {
  supabaseClient: null,
  session: null,
  user: null,
  errorMessage: null,
};

export const authStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withMethods((state, router = inject(Router)) => ({
    initializeSupabaseClientAndListenForAuthChanges: () => {
      const supabaseClient = createClient(
        environment.supabaseUrl,
        environment.supabaseKey,
      );

      patchState(state, { supabaseClient });

      supabaseClient.auth.onAuthStateChange((_, session) => {
        patchState(state, { session });
      });
    },
    signIn: async (email: string) => {
      if (state.supabaseClient()) {
        const { data, error } = await state
          .supabaseClient()!
          .auth.signInWithOtp({ email });
        console.log(data);

        if (error) {
          patchState(state, { errorMessage: error.message });
        }
        if (data) {
          patchState(state, { user: data.user });
          alert('Check your email for the login link!');
        }
      } else {
        console.error('Supabase client not initialized');
      }
    },
    signOut: async () => {
      if (state.supabaseClient()) {
        const { error } = await state.supabaseClient()!.auth.signOut();
        if (error) {
          console.error('Error signing out:', error);
          patchState(state, { errorMessage: error.message });
        }
        router.navigate(['/login']);
      } else {
        console.error('Supabase client not initialized');
      }
    },
  })),
  withHooks({
    onInit: (store) => {
      store.initializeSupabaseClientAndListenForAuthChanges();

      effect(() => {
        console.log(getState(store));
      });
    },
  }),
);
