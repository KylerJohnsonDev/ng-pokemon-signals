import { Routes } from '@angular/router';
import { PokemonComponent } from './app/pages/pokemon/pokemon-page.component';
import { PokemonStore } from './app/pokemon.store';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pokemon',
        component: PokemonComponent,
        title: 'Pokemon Type Helper',
      },
      { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/' },
];
