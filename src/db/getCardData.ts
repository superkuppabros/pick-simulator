export function getCardData() {
  const cardDataSheet = SpreadsheetApp.getActive().getSheetByName(
    "カードデータ"
  );
  const cardData = cardDataSheet.getDataRange().getValues();
  cardData.shift();
  return cardData;
}
