import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

import { PokemonStore } from './app/global-state/pokemon-store';
import { routes } from './routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), PokemonStore],
}).catch((err) => console.error(err));
