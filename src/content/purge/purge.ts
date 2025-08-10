import { menuButtonSelector } from "../consts.ts";
import { click, getUserTweet, querySelectorLoop } from "../lib.ts";
import { block } from "./block.ts";
import { reportSpam } from "./report.ts";

export async function purge(id: string) {
  const zombieTweet = await getUserTweet(id);

  // タイムラインが表示された後に取得しているので
  // ツイートが削除されたりアカウントが凍結・削除・ID変更等されたりしている場合のみreturnされるはず
  if (!zombieTweet) {
    return;
  }

  const menuButton = await querySelectorLoop(zombieTweet, menuButtonSelector);

  click(menuButton);
  await reportSpam();

  click(menuButton);
  await block(menuButton);
}
