function doGet() {
  var sheetApp = SpreadsheetApp.openById("12OcT_ElK2sG_B4wKZL-NHRE1UsfHk_5k_csjjAEss88");
  var simuss  = sheetApp.getSheetByName("シミュレータ");
  var result = simuss.getRange(7,2,15,5).getValues();
  Logger.log(result)
  var output =""
  output += "<html><head></head><body><center>";
  for(var i = 0; i < 15; i++){
   output += result[i][0]+","+result[i][1]+"<b>---</b>"+result[i][3]+","+result[i][4]+"<br>"
  }
  output += "</center></body></html>"
  var app = HtmlService.createTemplate(output);
  return app.evaluate();
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('操作')
    .addItem('ピックの入れ替え', 'reverse')
    .addItem('保存', 'save')
    .addToUi();
}
