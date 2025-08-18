// インプレゾンビの情報をストレージに保存する際のキー
export const zombiesKeyForStorage = "zombiesKey";

// カラーモードの設定をストレージに保存する際のキー
export const colorModeSettingKeyForStorage = "colorModeSettingsKey";

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

// ポップアップから削除ボタンを押した際に追加するパラメーター
// このパラメーターがある場合、ブロックを解除したうえでリストから登録を外す
export const removeZombieParam = "remove-zombie";

// ポップアップからブロックボタンを押した際に追加するパラメーター
// このパラメーターがある場合、ブロック・通報の処理をする
export const purgeZombieParam = "purge-zombie";

export const ellipsisMark = "...";

// 全員を処理
export const allPurgeParam = "all-purge";
