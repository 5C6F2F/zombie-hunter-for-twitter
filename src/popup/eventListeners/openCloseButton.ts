import { unreachable } from "../../lib/lib.ts";
import {
  purgeCloseButtonId,
  purgeOpenButtonId,
  settingsCloseButtonId,
  settingsElementId,
  settingsOpenButtonId,
  statisticsCloseButtonId,
  statisticsElementId,
  statisticsOpenButtonId,
  zombiesElementId,
} from "../consts.ts";
import { hide, showBlock, showFlex } from "./lib.ts";

export function openCloseButtonEvent() {
  const purgeOpenButton = document.getElementById(purgeOpenButtonId);
  const purgeCloseButton = document.getElementById(purgeCloseButtonId);
  const zombiesElement = document.getElementById(zombiesElementId);

  const statisticsOpenButton = document.getElementById(statisticsOpenButtonId);
  const statisticsCloseButton = document.getElementById(
    statisticsCloseButtonId,
  );
  const statisticsElement = document.getElementById(statisticsElementId);

  const settingsOpenButton = document.getElementById(settingsOpenButtonId);
  const settingsCloseButton = document.getElementById(
    settingsCloseButtonId,
  );
  const settingsElement = document.getElementById(settingsElementId);

  if (
    !purgeOpenButton || !purgeCloseButton || !zombiesElement ||
    !statisticsOpenButton || !statisticsCloseButton || !statisticsElement ||
    !settingsOpenButton || !settingsCloseButton || !settingsElement
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

  statisticsOpenButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide(statisticsOpenButton);
    showFlex(statisticsCloseButton);
    showBlock(statisticsElement);
  });

  statisticsCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(statisticsOpenButton);
    hide(statisticsCloseButton);
    hide(statisticsElement);
  });

  settingsOpenButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide(settingsOpenButton);
    showFlex(settingsCloseButton);
    showBlock(settingsElement);
  });

  settingsCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    showFlex(settingsOpenButton);
    hide(settingsCloseButton);
    hide(settingsElement);
  });
}
