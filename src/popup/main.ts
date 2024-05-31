import { ZombiesMap } from "../lib/zombiesMap.ts";
import { noZombiesId, zombiesElementId, zombiesNumId } from "./consts.ts";
import { popupEventListener } from "./popupEventListeners.ts";

popupEventListener(null);

(async () => {
  const zombies = await new ZombiesMap().loadZombiesFromStorage();

  const zombieHTML = zombies.parseToHTML();
  const zombiesElement = document.getElementById(zombiesElementId);
  const zombiesNum = document.getElementById(zombiesNumId);
  const noZombies = document.getElementById(noZombiesId);

  if (zombieHTML && zombiesElement && zombiesNum && noZombies) {
    noZombies.style.display = "none";
    zombiesNum.innerText = zombies.length.toString();
    zombiesElement.appendChild(zombieHTML);
    popupEventListener(zombies);
  }
})();
