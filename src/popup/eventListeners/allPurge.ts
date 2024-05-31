import { sleep } from "../../content/purge/lib.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import {
  allPurgeButtonId,
  allPurgeStopButtonId,
  zombieClassName,
  zombieIdClassName,
} from "../consts.ts";
import { closeTab, hide, setZombiesNum, showFlex } from "./lib.ts";

export function allPurgeListener() {
  const allPurgeButton = document.getElementById(allPurgeButtonId);
  const allPurgeStopButton = document.getElementById(allPurgeStopButtonId);

  if (!(allPurgeButton && allPurgeStopButton)) {
    return;
  }

  allPurgeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    hide(allPurgeButton);
    showFlex(allPurgeStopButton);

    chrome.tabs.create({ url: "https://twitter.com?all-purge=true" });

    await waitAllPurgeCompleteAndChangePopup();

    closeTab();

    showFlex(allPurgeButton);
    hide(allPurgeStopButton);
  });

  allPurgeStopButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(allPurgeButton);
    hide(allPurgeStopButton);
  });
}

async function waitAllPurgeCompleteAndChangePopup() {
  const zombies = await new ZombiesMap().loadZombiesFromStorage();
  while (zombies.length > 0) {
    await sleep(1000);
    const newZombies = await new ZombiesMap().loadZombiesFromStorage();

    if (newZombies.length === zombies.length) {
      continue;
    }

    for (const id of zombies.ids()) {
      if (!newZombies.has(id)) {
        zombies.remove(id);
        removePurgedZombieElement(id);
      }
    }

    setZombiesNum(zombies.length);
  }
}

function removePurgedZombieElement(id: string) {
  const elements = document.getElementsByClassName(zombieClassName);
  for (const element of elements) {
    if (
      element.getElementsByClassName(zombieIdClassName)[0].textContent == id
    ) {
      element.remove();
      break;
    }
  }
}
