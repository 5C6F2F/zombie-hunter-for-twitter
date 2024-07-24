import { sleep } from "../lib/lib.ts";
import {
  blockButtonSelector,
  confirmBlockButtonSelector,
  menuButtonSelector,
} from "./consts.ts";
import { click, getUserTweet } from "./lib.ts";

export async function unblock(id: string) {
  const zombieTweet = await getUserTweet(id);

  // タイムラインが表示された後に取得しているので
  // ツイートが削除されたりアカウントが凍結・削除・ID変更等されたりしている場合のみreturnされるはず
  if (!zombieTweet) {
    return;
  }

  let menuButton = zombieTweet.querySelector(menuButtonSelector);
  while (!menuButton) {
    await sleep(50);
    menuButton = zombieTweet.querySelector(menuButtonSelector);
  }

  click(menuButton);

  // ブロックのボタンとブロック解除のボタンのセレクタは完全に一緒
  let unBlockButton = document.querySelector(blockButtonSelector);

  while (!unBlockButton) {
    await sleep(50);
    unBlockButton = document.querySelector(blockButtonSelector);
  }

  click(unBlockButton);

  let confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  while (!confirmBlockButton) {
    await sleep(50);
    confirmBlockButton = document.querySelector(confirmBlockButtonSelector);
  }

  click(confirmBlockButton);
}
