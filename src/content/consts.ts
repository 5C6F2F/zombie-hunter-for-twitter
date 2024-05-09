// hideButton用のアイコンパス
// https://pictogram2.com/?p=280 「旗を振る人」を使用させていただきました
export const iconPath = chrome.runtime.getURL("./icons/hideButton.png");

// インプレゾンビの情報をストレージに保存する際のキー
export const zombiesKeyForStorage = "zombiesKey";


// ツイート本体
export const tweetSelector = "article[data-testid='tweet']";

// ツイートのwrapper 非表示対象
export const zombieTweetSelector = "div[data-testid='cellInnerDiv']";

// ツイート右上の三点リーダー
export const caretSelector = "div[data-testid='caret']";

// 非表示ボタン
export const hideButtonClassName = "hide-button";

// ツイートテキスト
export const tweetTextSelector = "div[data-testid='tweetText']";


// "{ID}さんをブロック"のボタン
export const blockButtonSelector = "div[data-testid='block']";

// blockButtonSelectorのボタンにこの文字列がない場合、既にブロックしていると判定
export const blockKeyWord = "さんをブロック";

// ブロック確認のボタン
export const confirmBlockButtonSelector = "div[data-testid='confirmationSheetConfirm']";


// "ポストさんを報告"のボタン
export const reportButtonSelector = "div[data-testid='report']";

// 報告する種類 -> スパム
export const selectSpamReportTypeSelector = "div[role='radiogroup'] > div > label:nth-child(6)"

// 報告画面「次へ」ボタン
export const nextButtonSelector = "div[data-testid='ChoiceSelectionNextButton']";

// 報告画面「完了」ボタン
export const completeButtonSelector = "div[data-testid='ocfSettingsListNextButton']"
