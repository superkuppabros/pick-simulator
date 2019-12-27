const simulatorSheet = SpreadsheetApp.getActive().getSheetByName(
  "新シミュレータ"
);

export namespace sim {
  export const turnRange = simulatorSheet.getRange(7, 4);
  export const leaderRange = simulatorSheet.getRange(10, 4);
  export const displayedIdRange = simulatorSheet.getRange(4, 2, 1, 5);
  export const displayLeftRange = simulatorSheet.getRange(4, 2, 5, 2);
  export const displayRightRange = simulatorSheet.getRange(4, 5, 5, 2);
  export const pickHistoryRange = (turn: number) =>
    simulatorSheet.getRange(10 + turn, 8, 1, 5);
  export const allHistoryRange = simulatorSheet.getRange(11, 8, 15, 5);
  export const pickDeckRange = (turn: number) =>
    simulatorSheet.getRange(10 + turn, 14, 1, 6);
  export const allPickDeckRange = simulatorSheet.getRange(11, 14, 15, 6);
  export const allEvenPickDeckRange = simulatorSheet.getRange(11, 14, 15, 3);
  export const allOddPickDeckRange = simulatorSheet.getRange(11, 17, 15, 3);
}
