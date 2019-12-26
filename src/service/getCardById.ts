import { Card } from "../model/Card";

export function getCardById(id: string, cardList: Card[]): Card {
  return cardList.filter(card => card.id == id)[0];
}
