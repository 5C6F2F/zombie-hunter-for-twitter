import { unreachable } from "../../lib/lib.ts";
import {
  purgeCloseButtonId,
  purgeOpenButtonId,
  othersCloseButtonId,
  othersElementId,
  othersOpenButtonId,
  zombiesElementId,
} from "../consts.ts";
import { hide, showBlock, showFlex } from "./lib.ts";

export function openCloseButtonEvent() {
  const purgeOpenButton = document.getElementById(purgeOpenButtonId);
  const purgeCloseButton = document.getElementById(purgeCloseButtonId);
  const zombiesElement = document.getElementById(zombiesElementId);

  const othersOpenButton = document.getElementById(othersOpenButtonId);
  const othersCloseButton = document.getElementById(
    othersCloseButtonId,
  );
  const othersElement = document.getElementById(othersElementId);

  if (
    !purgeOpenButton || !purgeCloseButton || !zombiesElement ||
    !othersOpenButton || !othersCloseButton || !othersElement
  ) {
    unreachable();
  }

  purgeOpenButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide(purgeOpenButton);
    showFlex(purgeCloseButton);
    showBlock(zombiesElement);
  });

  purgeCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(purgeOpenButton);
    hide(purgeCloseButton);
    hide(zombiesElement);
  });

  othersOpenButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide(othersOpenButton);
    showFlex(othersCloseButton);
    showBlock(othersElement);
  });

  othersCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(othersOpenButton);
    hide(othersCloseButton);
    hide(othersElement);
  });
}
