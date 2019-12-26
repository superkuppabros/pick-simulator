import { getPickSet } from "./service/getCardSetByOrder";
import { convertCardFromArray, Card } from "./model/Card";
import { Order, convertOrderFromArray } from "./model/Order";
import { convertProbListFromArray, ProbList } from "./model/Prob";
import { calculateCardStats } from "./service/calculateCardStats";
import { getCardData } from "./db/getCardData";
import { getOrderData } from "./db/getOrderData";
import { getProbData } from "./db/getProbData";
import { sim } from "./simulator-sheet/simulator-sheet";

function displayCard() {
  const turn = parseInt(sim.turnRange.getValue());
  if (turn > 15) return false;

  const leader = sim.leaderRange.getValue();
  const cardData = getCardData();
  const orderData = getOrderData();
  const probData = getProbData();
  const cardList: Card[] = cardData.map(row => convertCardFromArray(row));
  const orderList: Order[] = orderData.map(row => convertOrderFromArray(row));
  const probAllList = {};
  probData.forEach(row => {
    const probList = convertProbListFromArray(row);
    const key = Object.keys(probList)[0];
    probAllList[key] = probList[key];
  });

  const pickSet = getPickSet(
    cardList,
    orderList[turn - 1],
    leader,
    probAllList
  );
  Logger.log(pickSet);

  const pick1Arr = [];
  const pick1CardArr = [pickSet.cardSet1.card1, pickSet.cardSet1.card2];
  pick1Arr.push(pick1CardArr.map(card => card.id));
  pick1Arr.push(pick1CardArr.map(card => card.rarelity));
  pick1Arr.push(pick1CardArr.map(card => card.name));
  pick1Arr.push(pick1CardArr.map(card => calculateCardStats(card)));

  const pick2Arr = [];
  const pick2CardArr = [pickSet.cardSet2.card1, pickSet.cardSet2.card2];
  pick2Arr.push(pick2CardArr.map(card => card.id));
  pick2Arr.push(pick2CardArr.map(card => card.rarelity));
  pick2Arr.push(pick2CardArr.map(card => card.name));
  pick2Arr.push(pick2CardArr.map(card => calculateCardStats(card)));

  sim.displayLeftRange.setValues(pick1Arr);
  sim.displayRightRange.setValues(pick2Arr);
  return true;
}

function pick(side: string) {
  const turn = parseInt(sim.turnRange.getValue());
  if (turn > 15) return false;

  const idSet = sim.displayedIdRange.getValues();
  idSet[0][2] = side;

  sim.pickHistoryRange(turn).setValues(idSet);
  sim.sideRange(turn).setValue(side);
  sim.turnRange.setValue(turn + 1);

  displayCard();
  return true;
}

function pickLeft() {
  pick("L");
}

function pickRight() {
  pick("R");
}

function reset() {
  const select = Browser.msgBox(
    "本当にリセットしてよろしいですか？",
    Browser.Buttons.OK_CANCEL
  );
  if (select == "ok") {
    sim.allHistoryRange.clearContent();
    sim.allSideRange.clearContent();
    sim.turnRange.setValue(1);
    const leader = sim.leaderRange.getValue();
    if (leader == "") {
      Browser.msgBox("リーダーを入力してください.");
    } else {
      displayCard();
    }
  }
  return select;
}
