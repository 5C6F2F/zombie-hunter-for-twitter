import { hideZombies } from "./hideZombies.ts";
import { userFromTweet } from "../lib/user.ts";
import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  caretSelector,
  hideButtonClassName,
  iconPath,
  tweetSelector,
} from "./consts.ts";

export function addHideZombieButtons(zombies: ZombiesMap) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    if (tweet.getElementsByClassName(hideButtonClassName).length > 0) {
      continue;
    }

    const hideButtonDom = tweet.querySelector(caretSelector)?.parentElement;

    if (!hideButtonDom) {
      continue;
    }

    const hideButton = createButton(zombies, tweet);

    hideButtonDom.prepend(hideButton);
  }
}

function createButton(zombies: ZombiesMap, tweet: Element): HTMLDivElement {
  const hideButton = document.createElement("img");

  setAttribute(hideButton);
  setStyle(hideButton);
  setEventListener(hideButton, zombies, tweet);

  const container = document.createElement("div");
  container.style.display = "flex";

  container.appendChild(hideButton);

  return container;
}

function setAttribute(button: HTMLImageElement) {
  button.src = iconPath;
  button.className = hideButtonClassName;
  button.title = "非表示";
}

function setStyle(button: HTMLImageElement) {
  button.style.transform = "translateY(-2px)";
  button.style.borderRadius = "16px";
  button.style.height = "30px";
  button.style.padding = "2px";
  button.style.marginRight = "6px";
  button.style.cursor = "pointer";
  button.style.opacity = "0.70";
}

function setEventListener(
  button: HTMLImageElement,
  zombies: ZombiesMap,
  tweet: Element
) {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#fcdcde";
    button.style.transition = "background-color 0.3s";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "none";
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const zombie = userFromTweet(tweet);

    if (zombie) {
      zombies.add(zombie);
    }

    hideZombies(zombies);

    zombies.saveStorage();
  });
}
