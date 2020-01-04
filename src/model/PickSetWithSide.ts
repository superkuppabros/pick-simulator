import { PickSet } from "./PickSet";
import { Card } from "./Card";
import { CardSet } from "./CardSet";
import { getCardById } from "../service/getCardById";

export interface PickSetWithSide {
  pickSet: PickSet;
  side: string;
}

export function convertPickSetWithSideFromArr(
  cardList: Card[],
  historyData: any[][]
): PickSetWithSide[] {
  return historyData.map(arr => {
    const cardSet1: CardSet = {
      card1: getCardById(arr[0], cardList),
      card2: getCardById(arr[1], cardList)
    };
    const cardSet2: CardSet = {
      card1: getCardById(arr[3], cardList),
      card2: getCardById(arr[4], cardList)
    };
    const pickSetWithSide: PickSetWithSide = {
      pickSet: { cardSet1, cardSet2 },
      side: arr[2]
    };
    return pickSetWithSide;
  });
}
