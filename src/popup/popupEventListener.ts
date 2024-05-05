import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  closeButtonId,
  openButtonId,
  removeUserClassName,
  tweetURLClassName,
  zombieClassNameSelector,
  zombieIdClassName,
  zombiesElementId,
} from "./consts.ts";

export function popupEventListener(zombies: ZombiesMap | null) {
  const open_button = document.getElementById(openButtonId);
  const close_button = document.getElementById(closeButtonId);
  const zombiesElement = document.getElementById(zombiesElementId);

  if (!(open_button && close_button && zombiesElement)) {
    return;
  }

  open_button.addEventListener("click", (event) => {
    event.preventDefault();
    open_button.style.display = "none";
    close_button.style.display = "flex";
    zombiesElement.style.display = "block";
  });

  close_button.addEventListener("click", (event) => {
    event.preventDefault();
    open_button.style.display = "flex";
    close_button.style.display = "none";
    zombiesElement.style.display = "none";
  });

  const zombieElements = document.getElementsByClassName(tweetURLClassName);
  for (const element of zombieElements) {
    openInNewTabListener(element);
  }

  if (zombies) {
    const removeUserElements =
      document.getElementsByClassName(removeUserClassName);
    for (const element of removeUserElements) {
      removeUserListener(element, zombies);
    }
  }
}

function openInNewTabListener(element: Element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const href = element.getAttribute("href");
    if (href) {
      chrome.tabs.create({ url: href });
    }
  });
}

function removeUserListener(element: Element, zombies: ZombiesMap) {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    const zombieElement = element.closest(zombieClassNameSelector);
    const zombieId =
      zombieElement?.getElementsByClassName(zombieIdClassName)[0].textContent;

    if (zombieId && zombies.has(zombieId)) {
      zombies.remove(zombieId);
      zombieElement.remove();
      zombies.saveStorage();
    }
  });
}
