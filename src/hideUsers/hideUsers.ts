import { tweetSelector, userIdClassName } from "../domSelectors.ts";
import { HideUserIdSet } from "./hideUserIdSet.ts";

export const hideUserIds = new HideUserIdSet<string>();
export const hideUserIdsKey = "hideUserIds";

export function initHideUserIds() {
  chrome.storage.local.get(hideUserIdsKey, (ids) => {
    if (ids[hideUserIdsKey] != null) {
      hideUserIds.fromStorage(ids[hideUserIdsKey]);
    }
  });
}

export function hideUsers() {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const userId = tweet.getElementsByClassName(userIdClassName)[0].textContent;
    const htmlElementTweet = tweet as HTMLElement;

    if (userId != null && hideUserIds.has(userId)) {
      htmlElementTweet.style.display = "none";
    }
  }
}
