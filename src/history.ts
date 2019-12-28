import { getCardData } from "./db/getCardData";
import { Card, convertCardFromArray } from "./model/Card";
import { sim } from "./simulator-sheet/simulator-sheet";
import { Leader } from "./model/Leader";
import { getPortalUrl } from "./service/getPortalUrl";
import { convertPickSetWithSideFromArr } from "./service/convertPickSetWithSideFromArr";

const historySheet = SpreadsheetApp.getActive().getSheetByName("履歴");

function saveHistory() {
  const date = new Date(Date.now()).toLocaleString();

  const leader: Leader = sim.leaderRange.getValue();

  const cardData = getCardData();
  const cardList: Card[] = cardData.map(row => convertCardFromArray(row));
  const historyData = sim.allHistoryRange.getValues();
  const url = getPortalUrl(cardList, historyData, leader);

  const idList: string[] = [];
  convertPickSetWithSideFromArr(cardList, historyData).forEach(ps => {
    if (ps.side == "L") {
      idList.push(ps.pickSet.cardSet1.card1.id);
      idList.push(ps.pickSet.cardSet1.card2.id);
    } else {
      idList.push(ps.pickSet.cardSet2.card1.id);
      idList.push(ps.pickSet.cardSet2.card2.id);
    }
  });
  const writeArr: string[] = [date, leader, url].concat(idList);

  historySheet.appendRow(writeArr);
}
