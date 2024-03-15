import { Routes } from '@angular/router';
import { LoginPageComponent } from './app/pages/login-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'profile',
    loadComponent: () =>
      import('./app/pages/profile-page.component').then(
        (m) => m.ProfilePageComponent,
      ),
    data: { animation: 'ProfilePage' },
  },
  {
    path: 'favorite-pokemon',
    loadComponent: () =>
      import('./app/pages/favorite-pokemon.component').then(
        (m) => m.FavoritePokemonPageComponent,
      ),
    title: 'Favorite Pokemon',
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./app/pages/pokemon-detail-page.component').then(
        (m) => m.PokemonDetailPageComponent,
      ),
    title: 'Pokemon Detail',
    data: { animation: 'PokemonTypeToolPage' },
  },
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./app/pages/browse-pokemon-page.component').then(
        (m) => m.BrowsePokemonPageComponent,
      ),
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokemon' },
];
