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
    blockButton = document.querySelector(blockButtonSelector);
    await sleep(200);
  }

  if (blockButton?.textContent?.includes(blockKeyWord)) {
    click(blockButton);
  } else {
    return;
  }

  // 表示に時間がかかることがあるので繰り返して待機
  let confirmBlockButton;
  while (!confirmBlockButton) {
    confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
    await sleep(100);
  }

  click(confirmBlockButton);
}
