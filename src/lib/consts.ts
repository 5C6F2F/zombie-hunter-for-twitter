// 名前が記号のみだったりしたときに使う
// 名前の文字数制限は50文字なのでreplaceの処理は必要なし
export const noName =
  "noNamenoNamenoNamenoNamenoNamenoNamenoNamenoNamenoNamenoName";

// chrome.storageに保存する際に要素の間にいれる区切り
// ツイート本文中に含まれている場合、空文字にreplaceする
export const separator =
  "sepalatorsepalatorsepalatorsepalatorsepalatorsepalatorsepalatorsepalatorsepalatorsepalator";


// ポップアップから対象のツイートにアクセスした際のパラメーター
// このパラメーターがある場合、非表示処理を停止させる
export const zombieViewParam = "zombie-view";
