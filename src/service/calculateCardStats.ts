import { Card } from "../model/Card";

export function calculateCardStats(card: Card): string {
  if (card.atk == "-") return "Spell";
  else if (card.atk == "/") return "Amulet";
  else return `${card.atk}/${card.life}`;
}
