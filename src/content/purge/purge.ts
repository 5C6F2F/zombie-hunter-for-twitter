import { getUserInfo } from "../../lib/user.ts";
import { menuButtonSelector, tweetSelector } from "../consts.ts";
import { block } from "./block.ts";
import { sleep } from "./lib.ts";
import { reportSpam } from "./report.ts";

export async function purge(id: string) {
  const zombieTweet = await getZombieTweet(id);

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

async function getZombieTweet(
  id: string,
  retry?: number
): Promise<Element | null> {
  if (!retry) {
    retry = 0;
  } else if (retry >= 10) {
    return null;
  }

  const tweets = document.querySelectorAll(tweetSelector);
  let zombieTweet: Element | undefined;

  for (const tweet of tweets) {
    const [_, tweetId] = getUserInfo(tweet);

    if (tweetId && tweetId == id) {
      zombieTweet = tweet;
      break;
    }
  }

  if (!zombieTweet) {
    await sleep(200);
    return getZombieTweet(id, retry + 1);
  }

  return zombieTweet;
}
