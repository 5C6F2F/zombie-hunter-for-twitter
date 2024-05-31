import { ZombiesMap } from "../../lib/zombiesMap.ts";
import {
  removeUserClassName,
  zombieClassNameSelector,
  zombieIdClassName,
} from "../consts.ts";

export function removeUserListener(zombies: ZombiesMap) {
  const removeUserElements =
    document.getElementsByClassName(removeUserClassName);

  for (const element of removeUserElements) {
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
}
