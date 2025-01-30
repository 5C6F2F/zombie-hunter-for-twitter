import {
    blockButtonSelector,
    confirmBlockButtonSelector,
    menuButtonSelector,
} from "../consts.ts";
import { click, getUserTweet, querySelectorLoop } from "../lib.ts";

export async function unblock(id: string) {
  const zombieTweet = await getUserTweet(id);

  // タイムラインが表示された後に取得しているので
  // ツイートが削除されたりアカウントが凍結・削除・ID変更等されたりしている場合のみreturnされるはず
  if (!zombieTweet) {
    return;
  }

  const menuButton = await querySelectorLoop(zombieTweet, menuButtonSelector);
  click(menuButton);

  // ブロックのボタンとブロック解除のボタンのセレクタは完全に一緒
  const unBlockButton = await querySelectorLoop(document, blockButtonSelector);
  click(unBlockButton);

  const confirmBlockButton = await querySelectorLoop(
    document,
    confirmBlockButtonSelector
  );
  click(confirmBlockButton);
}
