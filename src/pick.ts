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

  const pick1Arr = [];
  const pick1CardArr = [pickSet.cardSet1.card1, pickSet.cardSet1.card2];
  pick1Arr.push(pick1CardArr.map(card => card.id));
  pick1Arr.push(pick1CardArr.map(card => card.rarelity));
  pick1Arr.push(pick1CardArr.map(card => card.name));
  pick1Arr.push(pick1CardArr.map(card => calculateCardStats(card)));
  pick1Arr.push(pick1CardArr.map(card => card.cost));

  const pick2Arr = [];
  const pick2CardArr = [pickSet.cardSet2.card1, pickSet.cardSet2.card2];
  pick2Arr.push(pick2CardArr.map(card => card.id));
  pick2Arr.push(pick2CardArr.map(card => card.rarelity));
  pick2Arr.push(pick2CardArr.map(card => card.name));
  pick2Arr.push(pick2CardArr.map(card => calculateCardStats(card)));
  pick2Arr.push(pick2CardArr.map(card => card.cost));

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

  const dc =
    side == "L"
      ? sim.displayLeftRange.getValues()
      : sim.displayRightRange.getValues(); //dc := displayedCard
  const deckArr = [
    [dc[4][0], dc[3][0], dc[2][0], dc[4][1], dc[3][1], dc[2][1]]
  ];
  sim.pickDeckRange(turn).setValues(deckArr);
  deckSort();

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

function deckSort() {
  const evenDeck = sim.allEvenPickDeckRange.getValues();
  const oddDeck = sim.allOddPickDeckRange.getValues();
  const deck = oddDeck.concat(evenDeck);
  const t = ["Spell", "Amulet"];
  const phi = [""];
  deck.sort((a, b) => (a[2] >= b[2] ? 1 : -1)); //名前順
  deck.sort((a, b) => t.indexOf(a[1]) - t.indexOf(b[1])); //Follwer→Spell→Amulet
  deck.sort((a, b) => a[0] - b[0]); //コスト順
  deck.sort((a, b) => phi.indexOf(a[2]) - phi.indexOf(b[2])); //空白を下に
  const sortedEvenDeck = deck.filter((_, index) => index % 2 == 0);
  const sortedOddDeck = deck.filter((_, index) => index % 2 == 1);
  sim.allEvenPickDeckRange.setValues(sortedEvenDeck);
  sim.allOddPickDeckRange.setValues(sortedOddDeck);
}

function reset() {
  const select = Browser.msgBox(
    "本当にリセットしてよろしいですか？",
    Browser.Buttons.OK_CANCEL
  );
  if (select == "ok") {
    sim.allHistoryRange.clearContent();
    sim.allPickDeckRange.clearContent();
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
