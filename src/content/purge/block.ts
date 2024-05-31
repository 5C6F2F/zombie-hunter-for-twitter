import {
  blockButtonSelector,
  blockKeyWord,
  confirmBlockButtonSelector,
} from "../consts.ts";
import { click, sleep } from "./lib.ts";

export async function block(menuButton: Element) {
  click(menuButton);

  let blockButton = document.querySelector(blockButtonSelector);

  while (!blockButton) {
    await sleep(50);
    blockButton = document.querySelector(blockButtonSelector);
  }

  if (blockButton?.textContent?.includes(blockKeyWord)) {
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
}
