import { Settings } from "../lib/settings.ts";
import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  noZombiesId,
  totalPurgeCountsId,
  zombiesElementId,
  zombiesNumId,
} from "./consts.ts";
import { hide } from "./eventListeners/lib.ts";
import { openCloseButtonEvent } from "./eventListeners/openCloseButton.ts";
import { popupEventListener } from "./popupEventListeners.ts";
import { reflectSettings, settingsEventListener } from "./others/settings.ts";
import { getTotalPurgeCounts } from "./others/totalPurgeCounts.ts";

openCloseButtonEvent();
settingsEventListener();

(async () => {
  const settings = await new Settings().loadSettingsFromStorage();
  reflectSettings(settings);

  const zombies = await new ZombiesMap().loadZombiesFromStorage();

  const zombieHTML = zombies.parseToHTML();
  const zombiesElement = document.getElementById(zombiesElementId);
  const zombiesNum = document.getElementById(zombiesNumId);
  const noZombies = document.getElementById(noZombiesId);

  if (zombieHTML && zombiesElement && zombiesNum && noZombies) {
    hide(noZombies);
    zombiesNum.innerText = zombies.length.toString();
    zombiesElement.appendChild(zombieHTML);
    popupEventListener(zombies);
  }

  const totalPurgeCountsElement = document.getElementById(totalPurgeCountsId);
  const totalPurgeCounts = await getTotalPurgeCounts();
  if (totalPurgeCountsElement) {
    totalPurgeCountsElement.textContent = totalPurgeCounts.toLocaleString();
  }
})();
