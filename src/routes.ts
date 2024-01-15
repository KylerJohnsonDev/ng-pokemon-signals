import { Routes } from '@angular/router';
import { PokemonComponent } from './app/pages/pokemon/pokemon-page.component';
import { PokemonStore } from './app/pages/pokemon/pokemon.store';
import { PokemonVersionGroupStore } from './app/pokemon-version-group.store';

export const routes: Routes = [
  {
    path: '',
    providers: [PokemonVersionGroupStore],
    children: [
      {
        path: 'pokemon',
        component: PokemonComponent,
        title: 'Pokemon Type Helper',
        providers: [PokemonStore],
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
  { path: '**', redirectTo: '/' },
];
