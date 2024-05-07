import { sleep } from "../content/purge/lib.ts";
import { purgeZombieParam } from "../lib/consts.ts";
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
} from "./consts.ts";

// 引数のnullはzombie以外の要素を初期化するときに使う
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

    const purgeZombieElements =
      document.getElementsByClassName(purgeZombieClassName);
    for (const element of purgeZombieElements) {
      purgeZombieListener(element, zombies);
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

function purgeZombieListener(element: Element, zombies: ZombiesMap) {
  element.addEventListener("click", async (event) => {
    event.preventDefault();

    const zombieElement = element.closest(zombieClassNameSelector);
    const zombieId =
      zombieElement?.getElementsByClassName(zombieIdClassName)[0].textContent;

    const urlElement =
      zombieElement?.getElementsByClassName(tweetURLClassName)[0];
    const href = urlElement?.getAttribute("href");

    if (!(href && zombieId)) {
      return;
    }

    const url = new URL(href);
    url.searchParams.append(purgeZombieParam, zombieId);
    chrome.tabs.create({ url: url.toString() });

    // content/main.tsでsaveStorage()されたタイミングで処理終了
    let newZombies = await new ZombiesMap().loadZombiesFromStorage();

    console.log(newZombies.length, zombies.length);
    while (newZombies.length === zombies.length) {
      await sleep(1000);
      newZombies = await new ZombiesMap().loadZombiesFromStorage();
      console.log(newZombies.length, zombies.length);
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.remove(tab.id);
      }
    });

    zombies.remove(zombieId);
    zombieElement.remove();
  });
}
