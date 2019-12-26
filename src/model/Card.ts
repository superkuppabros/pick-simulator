import { Leader } from "./Leader";
import { Rarelity } from "./Rarelity";

export class Card {
  id: string;
  name: string;
  cost: number;
  leader: Leader;
  rarelity: Rarelity;
  atk: string;
  life: string;
  version: string;
  valid: boolean;
}

export function convertCardFromArray(arr: any[]): Card {
  const card: Card = {
    id: arr[0],
    name: arr[1],
    cost: parseInt(arr[2]),
    leader: arr[3] as Leader,
    rarelity: arr[4] as Rarelity,
    atk: arr[5],
    life: arr[6],
    version: arr[7],
    valid: Boolean(arr[8])
  };

  return card;
}
