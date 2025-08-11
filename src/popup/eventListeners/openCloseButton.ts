import { closeButtonId, openButtonId, zombiesElementId } from "../consts.ts";
import { hide, showBlock, showFlex } from "./lib.ts";

export function openCloseButtonEvent() {
  const openButton = document.getElementById(openButtonId);
  const closeButton = document.getElementById(closeButtonId);
  const zombiesElement = document.getElementById(zombiesElementId);

  if (!openButton || !closeButton || !zombiesElement) {
    return;
  }

  openButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide(openButton);
    showFlex(closeButton);
    showBlock(zombiesElement);
  });

  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(openButton);
    hide(closeButton);
    hide(zombiesElement);
  });
}
