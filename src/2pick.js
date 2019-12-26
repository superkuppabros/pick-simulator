// function displayCard(){
//   var simuss = SpreadsheetApp.getActiveSheet();
//   var cardData = simuss.getRange(2,2,1,5).getValues();
//   var card = cardData[0];
//   var i = 0;
//   while(card[0] == card[1] || card[0] == card[3] || card[0] == card[4] || card[1] == card[3] || card[1] == card[4] || card[3] == card[4]){
//     simuss.getRange(1,7).setValue(i);
//     cardData = simuss.getRange(2,2,1,5).getValues();
//     card = cardData[0];
//     i++;
//   }
//   simuss.getRange(4,2,1,5).setValues(cardData);
//   var rareData = simuss.getRange(8,5,5,1).getValues();
//   if(rareData[0] == "ゴールド" && rareData[1] == "ゴールド" && rareData[3] == "ゴールド" && rareData[4] == "ゴールド"){
//     simuss.getRange(1,7).setValue(i);
//     i++;
//     displayCard();
//   }
// }

// function deckSort(simuss){
//   var c1 = simuss.getRange(8,8,15,3).getValues();
//   var c2 = simuss.getRange(8,11,15,3).getValues();
//   var arr = c1.concat(c2);
//   const t = ["Spell","Amulet"];
//   Logger.log(t.indexOf(arr[0][1]))
//   const phi = [""];
//   arr.sort(function(a,b){ //名前順
//     if(a[2] >= b[2]) return 1;
//     else return -1;
//   });
//   arr.sort(function(a,b){ //Follwer→Spell→Amulet
//     return t.indexOf(a[1]) - t.indexOf(b[1]);
//   });
//   arr.sort(function(a,b){ //コスト順
//     return a[0] - b[0];
//   });
//   arr.sort(function(a,b){ //空白を下に
//     return phi.indexOf(a[2]) - phi.indexOf(b[2]);
//   });
//   var evenArr = [];
//   for(var i = 0; i < 15; i++){
//     var evenValue = arr.splice(i,1)[0];
//     evenArr.push(evenValue);
//   }
  
//   simuss.getRange(8,14,15,3).setValues(evenArr);
//   simuss.getRange(8,17,15,3).setValues(arr);
// }

// function pickLeft(){
//   var simuss = SpreadsheetApp.getActiveSheet();  
//   var left = simuss.getRange(4,2,1,2).getValues();
//   var right = simuss.getRange(4,5,1,2).getValues();
//   var page = simuss.getRange(4,1).getValue();
//     page++;
//     simuss.getRange(6+page,2,1,2).setValues(left);
//     simuss.getRange(6+page,2,1,2).setFontColor("#ff0000");
//     simuss.getRange(6+page,5,1,2).setValues(right);
//     simuss.getRange(6+page,5,1,2).setFontColor("#808080");
//     simuss.getRange(6+page,10).setValue(left[0][0]);
//     simuss.getRange(6+page,13).setValue(left[0][1]);
//     simuss.getRange(4,1).setValue(page);
//     deckSort(simuss);
//   if(page < 16){
//     displayCard();
//   }
// } 

// function pickRight(){
//   var simuss = SpreadsheetApp.getActiveSheet();
//   var left = simuss.getRange(4,2,1,2).getValues();
//   var right = simuss.getRange(4,5,1,2).getValues();
//   var page = simuss.getRange(4,1).getValue();
//     page++;
//     simuss.getRange(6+page,2,1,2).setValues(left);
//     simuss.getRange(6+page,2,1,2).setFontColor("#808080");
//     simuss.getRange(6+page,5,1,2).setValues(right);
//     simuss.getRange(6+page,5,1,2).setFontColor("#ff0000");
//     simuss.getRange(6+page,10).setValue(right[0][0]);
//     simuss.getRange(6+page,13).setValue(right[0][1]);
//     simuss.getRange(4,1).setValue(page);
//     deckSort(simuss);
//   if(page < 16){
//     displayCard();
//   }
// } 

// function reset(){
//   var simuss = SpreadsheetApp.getActiveSheet();
//   var select = Browser.msgBox("本当にリセットしてよろしいですか？",Browser.Buttons.OK_CANCEL);
//   if(select == "ok"){
//     simuss.getRange(4,1).setValue(1);
//     simuss.getRange(8,2,15,2).clearContent();
//     simuss.getRange(8,5,15,2).clearContent();
//     simuss.getRange(8,10,15,1).clearContent();
//     simuss.getRange(8,13,15,1).clearContent();
//     simuss.getRange(8,14,15,6).clearContent();
//     simuss.getRange(8,1,15,13).setBackground("#ffffff");
//     var leader = simuss.getRange(7,4).getValue();
//     if(leader == ""){
//       Browser.msgBox("リーダーを入力してください.");
//     }else{
//       displayCard();
//     }
//   }
//   return select;
// }

// function autoPick(){
//   select = reset();
//   if(select == "ok"){
//     var simuss = SpreadsheetApp.getActiveSheet();
//     for(var i=0;i<15;i++){
//       var stim = simuss.getRange(4,4).getValue();
//       if(eval(stim)<0){
//         pickRight();
//       }else　if(eval(stim)==0){
//         var evalData = simuss.getRange(8,4,5,1).getValues();
//         var lDiff = Math.abs(parseInt(evalData[0]) - parseInt(evalData[1]));
//         var rDiff = Math.abs(parseInt(evalData[3]) - parseInt(evalData[4]));
//         if(lDiff - rDiff > 0){
//           pickRight();
//         }else{
//           pickLeft();
//         }
//       }else{
//         pickLeft();
//       }
//     }
//     Browser.msgBox("ピックが終了しました.");
//   }
// }

// function back(){
//   var simuss = SpreadsheetApp.getActiveSheet();
//   var page = simuss.getRange(4,1).getValue();
//   if(page >= 2){
//     page--;
//     simuss.getRange(7+page,2,1,2).clearContent();
//     simuss.getRange(7+page,5,1,2).clearContent();
//     simuss.getRange(7+page,10).clearContent();
//     simuss.getRange(7+page,13).clearContent();
//     simuss.getRange(4,1).setValue(page);
//     deckSort(simuss);
//     displayCard();
//   }
// }

// function reverse(){
//   var simuss = SpreadsheetApp.getActiveSheet();
//   var page = Browser.inputBox("入れ替えるピック(1~15の整数を入力)")
//   page = parseInt(page,10)
//   if(isNaN(page) == true || 0 > page || page > 15){
//     Browser.msgBox("有効な数字を入力してください。");
//   }else{
//     var pLeft = simuss.getRange(7+page,2,1,2);
//     var pRight = simuss.getRange(7+page,5,1,2);
//     var leftColor = pLeft.getFontColors()
//     if(leftColor[0][0] == "#ff0000"){
//       pLeft.setFontColor("#808080");
//       pRight.setFontColor("#ff0000");
//       var right = pRight.getValues();
//       simuss.getRange(7+page,10).setValue(right[0][0]);
//       simuss.getRange(7+page,13).setValue(right[0][1]);
//     }else{
//       pLeft.setFontColor("#ff0000");
//       pRight.setFontColor("#808080");
//       var left = pLeft.getValues();
//       simuss.getRange(7+page,10).setValue(left[0][0]);
//       simuss.getRange(7+page,13).setValue(left[0][1]);
//     }
    
//     //入れ替え位置の背景色変更
//     var pArea = simuss.getRange(7+page,1,1,13)
//     if(pArea.getBackgrounds()[0][0] == "#f0ffff"){
//       pArea.setBackground("#ffffff");
//     }else{
//       pArea.setBackground("#f0ffff");
//     }
//   }
//   deckSort(simuss);
// }

// // PDF作成関数　引数は（folderid:保存先フォルダID, ssid:PDF化するスプレッドシートID, sheetid:PDF化するシートID, filename:PDFの名前）
// function createPDF(foldername, ssid, sheetid, filename){
//   // PDFファイルの保存先となるフォルダをフォルダIDで指定
//   var folders = DriveApp.getFoldersByName(foldername);
//   if(folders.hasNext()){
//     var folder = DriveApp.getFoldersByName(foldername).next();    
//   }else{
//     var folder = DriveApp.createFolder(foldername);
//   }
//   // スプレッドシートをPDFにエクスポートするためのURL。このURLに色々なオプションを付けてPDFを作成
//   var url = "https://docs.google.com/spreadsheets/d/SSID/export?".replace("SSID", ssid);
//   // PDF作成のオプションを指定
//   var opts = {
//     exportFormat: "pdf",    // ファイル形式の指定 pdf / csv / xls / xlsx
//     format:       "pdf",    // ファイル形式の指定 pdf / csv / xls / xlsx
//     size:         "A4",     // 用紙サイズの指定 legal / letter / A4
//     portrait:     "false",   // true → 縦向き、false → 横向き
//     fitw:         "true",   // 幅を用紙に合わせるか
//     sheetnames:   "false",  // シート名をPDF上部に表示するか
//     printtitle:   "false",  // スプレッドシート名をPDF上部に表示するか
//     pagenumbers:  "false",  // ページ番号の有無
//     gridlines:    "false",  // グリッドラインの表示有無
//     fzr:          "false",  // 固定行の表示有無
//     gid:          sheetid   // シートIDを指定 sheetidは引数で取得
//   };
  
//   var url_ext = [];
//   // 上記のoptsのオプション名と値を「=」で繋げて配列url_extに格納
//   for( optName in opts ){
//     url_ext.push( optName + "=" + opts[optName] );
//   } 
//   // url_extの各要素を「&」で繋げる
//   var options = url_ext.join("&");

 
//   // API使用のためのOAuth認証
//   var token = ScriptApp.getOAuthToken();
//   // PDF作成
//   var response = UrlFetchApp.fetch(url + options, {
//     headers: {
//       'Authorization': 'Bearer ' +  token
//     }
//   });
//   var blob = response.getBlob().setName(filename + '.pdf'); 
//   //　PDFを指定したフォルダに保存
//   folder.createFile(blob);
// }

// function save(){
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var ssid = ss.getId();
//   var sheet = ss.getActiveSheet();
//   var sheetid = sheet.getSheetId();
//   var foldername = "2pick_simulator";
//   var date = new Date();
//   var year = date.getFullYear();
//   var month = String(date.getMonth());
//   var dt = String(date.getDate());
//   var hour = String(date.getHours());
//   var minute = String(date.getMinutes());
//   var filename = (year%100)+month+dt+"_"+hour+minute+"pick";
//   createPDF(foldername, ssid, sheetid, filename);
// }