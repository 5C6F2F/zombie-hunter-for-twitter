import { ZombiesSet } from "../lib/zombiesSet.ts";
import { noZombiesId, zombiesElementId, zombiesNumId } from "./consts.ts";
import { popupEventListener } from "./popupEventListener.ts";

document.getElementById("clear")?.addEventListener("click", () => {
  chrome.storage.local.clear();
});

(async () => {
  const zombies = await new ZombiesSet().loadZombiesFromStorage();

  const zombieHTML = zombies.parseToHTML();
  const zombiesElement = document.getElementById(zombiesElementId);
  const zombieQuantity = document.getElementById(zombiesNumId);
  const noZombies = document.getElementById(noZombiesId);

  if (zombieHTML && zombiesElement && zombieQuantity && noZombies) {
    noZombies.style.display = "none";
    zombieQuantity.innerText = zombies.zombies.length.toString();
    zombiesElement.appendChild(zombieHTML);
    popupEventListener(zombies);
  }
})();
