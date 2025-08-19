import { unreachable } from "../../lib/lib.ts";
import { feedbackLink, feedbackLinkId } from "../consts.ts";

export function feedbackEventListener() {
  const feedbackLinkElement = document.getElementById(feedbackLinkId);

  if (!feedbackLinkElement) {
    unreachable();
  }

  feedbackLinkElement.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: feedbackLink });
  });
}
