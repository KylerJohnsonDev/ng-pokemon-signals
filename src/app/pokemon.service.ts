import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoritePokemon, Pokemon } from './pokemon.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly pokeApiUrl = `https://pokeapi.co/api/v2`;

  supabaseClient: SupabaseClient | null;

  constructor(private http: HttpClient) {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  loadPokemonByIdentifier(identifier: number | string): Observable<Pokemon> {
    // pokemon can be loaded by integer id or string name
    const param = identifier.toString().toLowerCase();
    return this.http.get<Pokemon>(`${this.pokeApiUrl}/pokemon/${param}`);
  }

  loadTypeInfo(type: string): Observable<any> {
    return this.http.get(`${this.pokeApiUrl}/type/${type}`);
  }

  async addPokemonToFavorites(
    pokemon: Pokemon,
    userId: string,
  ): Promise<FavoritePokemon> {
    const favoritePokemon: Partial<FavoritePokemon> = {
      pokemon_name: pokemon.name,
      pokemon_id: pokemon.id,
      url_to_pokemon_image:
        pokemon.sprites?.other?.['official-artwork']?.front_default,
      user_id: userId,
    };
    const res = await this.supabaseClient
      ?.from('favorite_pokemon')
      .insert([favoritePokemon])
      .single();
    console.log(res);
    return res?.data as unknown as FavoritePokemon;
  }

  async getFavoritePokemon(userId: string): Promise<FavoritePokemon[]> {
    const res = await this.supabaseClient
      ?.from('favorite_pokemon')
      .select('*')
      .eq('user_id', userId);
    console.log(res);
    return res?.data as unknown as FavoritePokemon[];
  }

  async removePokemonFromFavorites(pokemon: FavoritePokemon): Promise<void> {
    const res = await this.supabaseClient
      ?.from('favorite_pokemon')
      .delete()
      .eq('id', pokemon.id);

    if (res?.error) {
      throw new Error('Unable to remove pokemon from favorites');
    }
  }
}
