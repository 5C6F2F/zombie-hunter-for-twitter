import { sleep } from "../../lib/lib.ts";
import {
  blockButtonSelector,
  blockKeyWord,
  confirmBlockButtonSelector,
} from "../consts.ts";
import { click } from "../lib.ts";

export async function block(
  menuButton: Element,
  styleElement?: HTMLStyleElement
) {
  click(menuButton);

  let blockButton = document.querySelector(blockButtonSelector);

  while (!blockButton) {
    await sleep(50);
    blockButton = document.querySelector(blockButtonSelector);
  }

  if (blockButton.textContent?.includes(blockKeyWord)) {
    click(blockButton);
  } else {
    // ブロック済み
    // menuButtonを押してダイアログを閉じる
    click(menuButton);
    return;
  }

  let confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  while (!confirmBlockButton) {
    await sleep(50);
    confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  }

  click(confirmBlockButton);

  if (styleElement) {
    // ブロック確認ダイアログとマスクのスタイルは元に戻しておく。
    styleElement.remove();
  }
}
