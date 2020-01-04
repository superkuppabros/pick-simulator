import { PickSetWithSide } from "../model/PickSetWithSide";

export function convertPickSetWithSideToIdList(
  pickSetWithSides: PickSetWithSide[]
): string[] {
  const idList: string[] = [];
  pickSetWithSides.forEach(ps => {
    if (ps.side == "L") {
      idList.push(ps.pickSet.cardSet1.card1.id);
      idList.push(ps.pickSet.cardSet1.card2.id);
    } else if (ps.side == "R") {
      idList.push(ps.pickSet.cardSet2.card1.id);
      idList.push(ps.pickSet.cardSet2.card2.id);
    }
  });
  return idList;
}
