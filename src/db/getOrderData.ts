export function getOrderData() {
  const orderDataSheet = SpreadsheetApp.getActive().getSheetByName("提示順");
  const orderData = orderDataSheet.getDataRange().getValues();
  orderData.shift();
  return orderData;
}
