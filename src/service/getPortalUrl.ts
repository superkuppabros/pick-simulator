import { PickSetWithSide } from "../model/PickSetWithSide";
import { Card } from "../model/Card";
import { convertIdToSv64 } from "./convertIdToSv64";
import { Leader } from "../model/Leader";
import { convertPickSetWithSideFromArr } from "./convertPickSetWithSideFromArr";

export function getPortalUrl(
  cardList: Card[],
  historyData: any[][],
  leader: Leader
): string {
  const history = convertPickSetWithSideFromArr(cardList, historyData);
  const url = convertHistoryToPortalUrl(history, leader);
  return url;
}

function convertHistoryToPortalUrl(
  history: PickSetWithSide[],
  leader: Leader
): string {
  const idList: string[] = [];
  history.forEach(ps => {
    if (ps.side == "L") {
      idList.push(ps.pickSet.cardSet1.card1.id);
      idList.push(ps.pickSet.cardSet1.card2.id);
    } else {
      idList.push(ps.pickSet.cardSet2.card1.id);
      idList.push(ps.pickSet.cardSet2.card2.id);
    }
  });
  const idNumberList = idList.map(id => parseInt(id));
  const sv64StringList = idNumberList.map(idNumber =>
    convertIdToSv64(idNumber)
  );

  const leaderList: Leader[] = [
    "エルフ",
    "ロイヤル",
    "ウィッチ",
    "ドラゴン",
    "ネクロマンサー",
    "ヴァンパイア",
    "ビショップ",
    "ネメシス"
  ];
  const leaderNum = (leaderList.indexOf(leader) + 1).toString();
  const url = `https://shadowverse-portal.com/deck/2.${leaderNum}.${sv64StringList.join(
    "."
  )}?lang=ja`;
  return url;
}
