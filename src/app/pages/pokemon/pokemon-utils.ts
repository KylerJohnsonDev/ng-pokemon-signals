import { TypeInformation } from "./pokemon.model";

export function getUniqueGoodAgainstBadAgainstTypes(typeInfoCollection: TypeInformation[]): { goodAgainst: string[], badAgainst: string[] } {
  const goodAgainst = new Set<string>();
  const badAgainst = new Set<string>();

  typeInfoCollection.forEach((typeInfo) => {
    typeInfo.damage_relations.double_damage_from.forEach((type) => {
        goodAgainst.add(type.name);
    });
    typeInfo.damage_relations.half_damage_from.forEach((type) => {
      badAgainst.add(type.name);
    });
  });

  return { goodAgainst: Array.from(goodAgainst), badAgainst: Array.from(badAgainst) };
}