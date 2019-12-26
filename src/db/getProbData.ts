export function getProbData() {
  const probDataSheet = SpreadsheetApp.getActive().getSheetByName("確率");
  const probData = probDataSheet.getDataRange().getValues();
  probData.shift();
  return probData;
}
