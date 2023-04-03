import { Routes } from '@angular/router';
import { PokemonComponent } from './app/pages/pokemon/pokemon.component';

export const routes: Routes = [
  { path: 'pokemon', component: PokemonComponent },
  { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
  { path: '**', redirectTo: '/' },
];
