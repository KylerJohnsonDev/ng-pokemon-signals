import { Routes } from '@angular/router';
import { PokemonLayoutComponent } from './app/pages/pokemon/pokemon-layout.component';
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
  },
  {
    path: 'pokemon',
    component: PokemonLayoutComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./app/pages/pokemon/pokemon-type-tool.component').then(
            (m) => m.PokemonTypeToolComponent,
          ),
        title: 'Pokemon Detail',
        data: { animation: 'PokemonTypeToolPage' },
      },
      {
        path: '',
        loadComponent: () =>
          import('./app/pages/pokemon/browse-pokemon-page.component').then(
            (m) => m.BrowsePokemonPageComponent,
          ),
        pathMatch: 'full',
      },
    ],
  },
  { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokemon' },
];
