import { getCardData } from "./db/getCardData";
import { Card, convertCardFromArray } from "./model/Card";
import { sim } from "./simulator-sheet/simulator-sheet";
import { Leader } from "./model/Leader";
import { getPortalUrl } from "./service/getPortalUrl";
import { convertPickSetWithSideFromArr } from "./model/PickSetWithSide";
import { convertPickSetWithSideToIdList } from "./service/convertPickSetWithSideToIdList";

const historySheet = SpreadsheetApp.getActive().getSheetByName("履歴");

function saveHistory() {
  const turn: number = sim.turnRange().getValue();
  if (turn != 16) return false;

  const date = new Date(Date.now()).toLocaleString();

  const leader: Leader = sim.leaderRange().getValue();

  const cardData = getCardData();
  const cardList: Card[] = cardData.map(row => convertCardFromArray(row));
  const historyData = sim.allHistoryRange().getValues();
  const pickSetWithSides = convertPickSetWithSideFromArr(cardList, historyData);
  const url = getPortalUrl(cardList, historyData, leader);

  const idList: string[] = convertPickSetWithSideToIdList(pickSetWithSides);
  const writeArr: string[] = [date, leader, url].concat(idList);

  historySheet.appendRow(writeArr);
}
