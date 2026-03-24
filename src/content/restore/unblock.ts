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
  if (!zombieTweet.isSuccess) {
    return;
  }

  const menuButton = await querySelectorLoop(
    zombieTweet.value,
    menuButtonSelector,
  );
  if (!menuButton.isSuccess) {
    return;
  }
  click(menuButton.value);

  // ブロックのボタンとブロック解除のボタンのセレクタは完全に一緒
  const unBlockButton = await querySelectorLoop(document, blockButtonSelector);
  if (!unBlockButton.isSuccess) {
    return;
  }
  click(unBlockButton.value);

  const confirmBlockButton = await querySelectorLoop(
    document,
    confirmBlockButtonSelector,
  );
  if (!confirmBlockButton.isSuccess) {
    return;
  }
  click(confirmBlockButton.value);
}
