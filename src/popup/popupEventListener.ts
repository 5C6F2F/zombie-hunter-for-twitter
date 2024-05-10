import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  purgeZombieClassName,
  closeButtonId,
  openButtonId,
  removeUserClassName,
  tweetURLClassName,
  zombieClassNameSelector,
  zombieIdClassName,
  zombiesElementId,
  allPurgeButtonId,
  allPurgeStopButtonId,
  zombiesNumId,
} from "./consts.ts";
import { purgePre } from "./purgePre.ts";

let purgeFlag = true;

// 引数のnullはzombie以外の要素を初期化するときに使う
export function popupEventListener(zombies: ZombiesMap | null) {
  const open_button = document.getElementById(openButtonId);
  const close_button = document.getElementById(closeButtonId);
  const zombiesElement = document.getElementById(zombiesElementId);
  const zombiesNum = document.getElementById(zombiesNumId);

  if (!(open_button && close_button && zombiesElement && zombiesNum)) {
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

    const purgeZombieElements =
      document.getElementsByClassName(purgeZombieClassName);
    for (const element of purgeZombieElements) {
      purgeZombieListener(element, zombies);
    }

    const allPurgeButton = document.getElementById(allPurgeButtonId);
    const allPurgeStopButton = document.getElementById(allPurgeStopButtonId);

    if (!(allPurgeButton && allPurgeStopButton)) {
      return;
    }

    allPurgeButton.addEventListener("click", async (event) => {
      event.preventDefault();
      allPurgeButton.style.display = "none";
      allPurgeStopButton.style.display = "flex";

      for (const element of purgeZombieElements) {
        if (purgeFlag) {
          await purgePre(element, zombies);
          decreaseZombiesNum(zombiesNum);
        }
      }

      allPurgeButton.style.display = "flex";
      allPurgeStopButton.style.display = "none";
    });

    allPurgeStopButton.addEventListener("click", (event) => {
      event.preventDefault();
      allPurgeButton.style.display = "flex";
      allPurgeStopButton.style.display = "none";
      purgeFlag = false;
    });
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

function purgeZombieListener(element: Element, zombies: ZombiesMap) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    purgePre(element, zombies);
  });
}

function decreaseZombiesNum(zombiesNum: Element) {
  if (zombiesNum.textContent) {
    const num = parseInt(zombiesNum.textContent);

    if (num) {
      zombiesNum.textContent = (num - 1).toString();
    }
  }
}
