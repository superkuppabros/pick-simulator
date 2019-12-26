const simulatorSheet = SpreadsheetApp.getActive().getSheetByName(
  "新シミュレータ"
);

export namespace sim {
  export const turnRange = simulatorSheet.getRange(7, 4);
  export const leaderRange = simulatorSheet.getRange(9, 4);
  export const displayedIdRange = simulatorSheet.getRange(4, 2, 1, 5);
  export const displayLeftRange = simulatorSheet.getRange(4, 2, 4, 2);
  export const displayRightRange = simulatorSheet.getRange(4, 5, 4, 2);
  export const pickHistoryRange = (turn: number) =>
    simulatorSheet.getRange(9 + turn, 8, 1, 5);
  export const allHistoryRange = simulatorSheet.getRange(10, 8, 15, 5);
  export const sideRange = (turn: number) =>
    simulatorSheet.getRange(9 + turn, 4);
  export const allSideRange = simulatorSheet.getRange(10, 4, 15, 1);
}
