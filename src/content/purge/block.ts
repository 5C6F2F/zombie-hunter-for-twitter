import {
  blockButtonSelector,
  blockKeyWord,
  confirmBlockButtonSelector,
} from "../consts.ts";
import { click, querySelectorLoop } from "../lib.ts";

export async function block(
  menuButton: Element,
  styleElement?: HTMLStyleElement
) {
  const blockButton = await querySelectorLoop(document, blockButtonSelector);

  if (blockButton.textContent?.includes(blockKeyWord)) {
    click(blockButton);
  } else {
    // ブロック済み
    // menuButtonを押してダイアログを閉じる
    click(menuButton);
    return;
  }

  const confirmBlockButton = await querySelectorLoop(
    document,
    confirmBlockButtonSelector
  );
  click(confirmBlockButton);

  if (styleElement) {
    // ブロック確認ダイアログとマスクのスタイルは元に戻しておく。
    styleElement.remove();
  }
}
