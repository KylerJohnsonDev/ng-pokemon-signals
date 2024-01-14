import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeLookupPipe } from '../utils/pokemon-type-lookup.pipe';

@Component({
  selector: 'app-type-pill',
  standalone: true,
  imports: [CommonModule, PokemonTypeLookupPipe],
  template: `
    <span
      class="px-3 py-1 rounded-2xl text-white font-bold"
      *ngIf="text | pokemonTypeLookup as typePillAppearanceInfo"
      [ngStyle]="{ 'background-color': typePillAppearanceInfo.color }"
      >{{ typePillAppearanceInfo.label }}</span>
  `,
  styles: ``
})
export class TypePillComponent {
  @Input({ required: true }) text!: string;
}
