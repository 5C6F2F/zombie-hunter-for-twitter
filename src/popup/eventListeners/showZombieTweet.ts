import { ZombiesMap } from "../../lib/zombiesMap.ts";
import {
  tweetURLClassName,
  zombieClassNameSelector,
  zombieIdClassName,
} from "../consts.ts";

export function showZombieTweetListener(zombies: ZombiesMap) {
  const elements = document.getElementsByClassName(tweetURLClassName);

  for (const element of elements) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const zombieId = element
        .closest(zombieClassNameSelector)
        ?.getElementsByClassName(zombieIdClassName)[0].textContent;

      if (!zombieId) {
        return;
      }

      const zombie = zombies.get(zombieId);
      const url = zombie?.noHideURL;
      if (url) {
        chrome.tabs.create({ url: url });
      }
    });
  }
}
