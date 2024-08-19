import { sleep } from "../../lib/lib.ts";
import { menuButtonSelector } from "../consts.ts";
import { getUserTweet } from "../lib.ts";
import { block } from "./block.ts";
import { reportSpam } from "./report.ts";

export async function purge(id: string, isAllPurge: boolean) {
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

  // 連続で7人以上報告するとレート制限がかかる
  // 全員を通報する場合はレート制限回避のために7秒待機
  if (isAllPurge) {
    // 一応表示しておく
    const note = document.createElement("div");
    note.innerText = "レート制限回避中...";
    note.style.fontSize = "70px";
    note.style.backgroundColor = "rgba(60, 179, 113, 0.5)";
    note.style.position = "absolute";
    note.style.right = "0";
    note.style.left = "0";
    note.style.textAlign = "center";
    document.body.appendChild(note);

    await sleep(7000);

    note.remove();
  }

  await reportSpam(menuButton);

  await block(menuButton);
}
