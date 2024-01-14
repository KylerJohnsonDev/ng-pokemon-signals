import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PokemonService {

  private readonly pokeApiUrl = `https://pokeapi.co/api/v2`;

  constructor(private http: HttpClient) {}

  loadPokemonByIdentifier(identifier: number | string): Observable<Pokemon> {
    // pokemon can be loaded by integer id or string name
    const param = identifier.toString().toLowerCase();
    return this.http.get<Pokemon>(`${this.pokeApiUrl}/pokemon/${param}`);
  }

  loadTypeInfo(type: string): Observable<any> {
    return this.http.get(`${this.pokeApiUrl}/type/${type}`);
  }
}