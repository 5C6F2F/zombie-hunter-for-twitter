import {
  caretSelector,
  hideButtonClassName,
  tweetSelector,
} from "./domSelectors.ts";

const IconPath = "icons/hideButton.png";

export function addHideButtons() {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    if (tweet.getElementsByClassName(hideButtonClassName).length > 0) {
      continue;
    }

    const hideButtonDom = tweet.querySelector(caretSelector)?.parentElement;

    if (hideButtonDom == null) {
      continue;
    }

    const hideButton = createHideButton();

    hideButtonDom.prepend(hideButton);
  }
}

function createHideButton(): HTMLDivElement {
  const hideButton = document.createElement("img");

  setAttribute(hideButton);
  setStyle(hideButton);
  setEventListener(hideButton);

  const container = document.createElement("div");
  container.style.display = "flex";

  container.appendChild(hideButton);

  return container;
}

function setAttribute(button: HTMLImageElement) {
  button.src = chrome.runtime.getURL(IconPath);
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

function setEventListener(button: HTMLImageElement) {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#fcdcde";
    button.style.transition = "background-color 0.3s";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "none";
  });
}
