import { Rarelity, RarelityName } from "./Rarelity";

interface Prob {
  [rarelity: string]: number;
}

export interface ProbList {
  [version: string]: Prob;
}

export function convertProbListFromArray(arr: any[]): ProbList {
  const version = arr.shift();
  const prob: Prob = {
    [RarelityName.Legend.toString()]: arr[0],
    [RarelityName.Gold.toString()]: arr[1],
    [RarelityName.Silver.toString()]: arr[2],
    [RarelityName.Bronze.toString()]: arr[3]
  };

  const probList: ProbList = {
    [version]: prob
  };

  return probList;
}
