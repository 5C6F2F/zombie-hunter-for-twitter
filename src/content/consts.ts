// hideButton用のアイコンパス
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
