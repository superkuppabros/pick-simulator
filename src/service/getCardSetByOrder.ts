import { Card } from "../model/Card";
import { Order } from "../model/Order";
import { RarelityName } from "../model/Rarelity";
import { Leader, LeaderName } from "../model/Leader";
import { PickSet } from "../model/PickSet";
import { CardSet } from "../model/CardSet";
import { ProbList } from "../model/Prob";

export function getPickSet(
  cardList: Card[],
  order: Order,
  leader: Leader,
  probList: any
): PickSet {
  return extractPickSet(
    extractValidCardListByOrder(cardList, order, leader),
    probList
  );
}

function extractValidCardListByOrder(
  cardList: Card[],
  order: Order,
  leader: Leader
): Card[] {
  const neutral = LeaderName.Neutral;
  const legend = RarelityName.Legend;
  const gold = RarelityName.Gold;
  const silver = RarelityName.Silver;
  const bronze = RarelityName.Bronze;

  const validCardList: Card[] = cardList.filter(card => card.valid == true);
  let leaderCardList: Card[] = validCardList.filter(
    card => card.leader == leader || card.leader == neutral
  );

  if (!order.leader_legend_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != leader || card.rarelity != legend
    );
  if (!order.leader_gold_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != leader || card.rarelity != gold
    );
  if (!order.leader_silver_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != leader || card.rarelity != silver
    );
  if (!order.leader_bronze_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != leader || card.rarelity != bronze
    );
  if (!order.neutral_legend_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != neutral || card.rarelity != legend
    );
  if (!order.neutral_gold_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != neutral || card.rarelity != gold
    );
  if (!order.neutral_silver_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != neutral || card.rarelity != silver
    );
  if (!order.neutral_bronze_flag)
    leaderCardList = leaderCardList.filter(
      card => card.leader != neutral || card.rarelity != bronze
    );

  return leaderCardList;
}

function extractPickSet(cardList: Card[], probList: any): PickSet {
  const probCorrectionList = cardList.map(
    card => probList[card.version][card.rarelity]
  );
  const tempList = cardList;

  function randomPick(): Card {
    const totalProbCorrection = probCorrectionList.reduce((x, y) => x + y);
    let random = Math.random() * totalProbCorrection;

    let i = 0;
    while (probCorrectionList[i] < random) {
      random -= probCorrectionList[i];
      i++;
    }

    const card = tempList[i];
    tempList.splice(i, 1);
    probCorrectionList.splice(i, 1);
    return card;
  }
  const cardSet1: CardSet = { card1: randomPick(), card2: randomPick() };
  const cardSet2: CardSet = { card1: randomPick(), card2: randomPick() };
  return { cardSet1, cardSet2 };
}
