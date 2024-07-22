import {
  blockButtonSelector,
  blockKeyWord,
  confirmBlockButtonSelector,
  removeMaskStyle,
} from "../consts.ts";
import { click, sleep } from "./lib.ts";

export async function block(menuButton: Element) {
  // ブロックする際の黒っぽいマスクを削除する。
  const styleElement = removeMask();

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
    return;
  }

  let confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  while (!confirmBlockButton) {
    await sleep(50);
    confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  }

  click(confirmBlockButton);

  // マスクのスタイルは元に戻しておく。
  styleElement.remove();
}

function removeMask(): HTMLStyleElement {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = removeMaskStyle;
  document.head.appendChild(styleElement);
  return styleElement;
}
