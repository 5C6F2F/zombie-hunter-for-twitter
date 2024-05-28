import { sleep } from "../../content/purge/lib.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import { allPurgeButtonId, allPurgeStopButtonId } from "../consts.ts";
import { hide, setZombiesNum, showFlex } from "./lib.ts";

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

    await waitAllPurgeCompleteAndChangeCount();

    showFlex(allPurgeButton);
    hide(allPurgeStopButton);
  });

  allPurgeStopButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(allPurgeButton);
    hide(allPurgeStopButton);
  });
}

async function waitAllPurgeCompleteAndChangeCount() {
  let zombiesNum = (await new ZombiesMap().loadZombiesFromStorage()).length;
  while (zombiesNum > 0) {
    await sleep(1000);
    zombiesNum = (await new ZombiesMap().loadZombiesFromStorage()).length;
    setZombiesNum(zombiesNum);
  }
}
