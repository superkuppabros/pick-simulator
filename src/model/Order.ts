export class Order {
  turn: number;
  leader_legend_flag: boolean;
  leader_gold_flag: boolean;
  leader_silver_flag: boolean;
  leader_bronze_flag: boolean;
  neutral_legend_flag: boolean;
  neutral_gold_flag: boolean;
  neutral_silver_flag: boolean;
  neutral_bronze_flag: boolean;
}

export function convertOrderFromArray(arr: any[]): Order {
  const order: Order = {
    turn: parseInt(arr[0]),
    leader_legend_flag: Boolean(parseInt(arr[1])),
    leader_gold_flag: Boolean(parseInt(arr[2])),
    leader_silver_flag: Boolean(parseInt(arr[3])),
    leader_bronze_flag: Boolean(parseInt(arr[4])),
    neutral_legend_flag: Boolean(parseInt(arr[5])),
    neutral_gold_flag: Boolean(parseInt(arr[6])),
    neutral_silver_flag: Boolean(parseInt(arr[7])),
    neutral_bronze_flag: Boolean(parseInt(arr[8]))
  };

  return order;
}
