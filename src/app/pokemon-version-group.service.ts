import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VersionGroup } from './pages/pokemon/pokemon.model';
import { pokemonApiUrl } from './APP_CONSTANTS';
import { Observable, map } from 'rxjs';

interface VersionGroupResponse {
  count: number;
  next: string;
  previous: string;
  results: VersionGroup[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonVersionGroupService {
  constructor(private http: HttpClient) {}

  loadPokemonVersionGroups(): Observable<VersionGroup[]> {
    return this.http
      .get<VersionGroupResponse>(`${pokemonApiUrl}/version-group`)
      .pipe(map((res) => res.results));
  }
}
