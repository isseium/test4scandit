// モジュール読込
var scanditsdk = require("com.mirasense.scanditsdk");

// iOS のときはステータスバーを非表示
if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
  Titanium.UI.iPhone.statusBarHidden = true;
}

// バーコード読み取り画面を作成
var barcodeWin = Titanium.UI.createWindow({  
  title:'Scandit SDK',
  navBarHidden:true
});

// バーコードビューのインスタンス
var picker = scanditsdk.createView({
  width:"100%",
  height:"100%"
});
// 初期化
picker.init("", 0);
picker.showSearchBar(false);    // 上部に検索バーを表示しない
picker.showToolBar(true);       // scanditのツールバーを表示する

// 成功時のコールバック設定
picker.setSuccessCallback(function(e) {
  alert('barcode の値は ' + e.barcode + ' です');
  barcodeWin.close();
});


// 既存のビューに組み込み
$.index.add(picker);
$.index.addEventListener('open', function(e) {
  // 各種プラットフォームへの最適化
  if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
    picker.setOrientation(Ti.UI.orientation);
  }   
  else {
    picker.setOrientation(barcodeWin.orientation);
  }

  picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
  picker.startScanning();     // startScanning() has to be called after the window is opened. 
});

// 画面表示
$.index.open();
