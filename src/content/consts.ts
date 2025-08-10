// ----- コンテンツ -----

// hideButton用のアイコンパス
// https://pictogram2.com/?p=280 「旗を振る人」を使用させていただきました
export const iconPath = chrome.runtime.getURL("./icons/hideButton.png");

// インプレゾンビの情報をストレージに保存する際のキー
export const zombiesKeyForStorage = "zombiesKey";

// タイムライン
export const timeLineSelector = "div[aria-label='ホームタイムライン']";

// ツイート本体
export const tweetSelector = "article[data-testid='tweet']";

// ツイートのwrapper 非表示対象
export const zombieTweetSelector = "div[data-testid='cellInnerDiv']";

// ツイート右上の三点リーダー
export const menuButtonSelector = "button[data-testid='caret']";

// 三点リーダーを押した際のドロップダウン
export const dropDownSelector = "div[data-testid='Dropdown']";

// フォロー中の人の場合ドロップダウンに表示される文字列。
export const followingKeyWord = "さんのフォローを解除";

// 非表示ボタン
export const hideButtonClassName = "hide-button";

// ツイートテキスト
export const tweetTextSelector = "div[data-testid='tweetText']";

// ツイート主の名前とID
export const userNameIdSelector = "div[data-testid='User-Name']";

// ----- ブロック -----

// "{ID}さんをブロック"のボタン
export const blockButtonSelector = "div[data-testid='block']";

// blockButtonSelectorのボタンにこの文字列がない場合、既にブロックしていると判定
export const blockKeyWord = "さんをブロック";

// ブロック確認のボタン
export const confirmBlockButtonSelector =
  "button[data-testid='confirmationSheetConfirm']";

// ブロック確認画面とその周りのマスクを非表示
export const removeMaskStyle =
  ".css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-1kihuf0.r-xr3zp9.r-1awozwy.r-1pjcn9w.r-9dcw1g { display: none; }";

// ----- 通報 -----

// "ポストさんを報告"のボタン
export const reportButtonSelector = "div[data-testid='report']";

// 報告する種類 -> スパム
export const selectSpamReportTypeSelector =
  "div[role='radiogroup'] > div > label:nth-child(7)";

// 報告画面「次へ」ボタン
export const nextButtonSelector =
  "button[data-testid='ChoiceSelectionNextButton']";

// 報告画面「完了」ボタン
export const completeButtonSelector =
  "button[data-testid='ocfSettingsListNextButton']";
