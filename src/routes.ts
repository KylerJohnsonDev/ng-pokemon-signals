import { Routes } from '@angular/router';
import { PokemonComponent } from './app/pages/pokemon/pokemon-page.component';
import { PokemonStore } from './app/pages/pokemon/pokemon.store';

export const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent,
    title: 'Pokemon Type Helper',
    providers: [PokemonStore]
  },
  { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
  { path: '**', redirectTo: '/' },
];
