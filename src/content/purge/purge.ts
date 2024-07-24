import { sleep } from "../../lib/lib.ts";
import { menuButtonSelector } from "../consts.ts";
import { getUserTweet } from "../lib.ts";
import { block } from "./block.ts";
import { reportSpam } from "./report.ts";

export async function purge(id: string) {
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

  await reportSpam(menuButton);

  await block(menuButton);
}
