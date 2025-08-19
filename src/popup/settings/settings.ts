import { colorModeSettingKeyForStorage } from "../../lib/consts.ts";
import { unreachable } from "../../lib/lib.ts";
import { ColorMode, Settings } from "../../lib/settings.ts";
import { colorModeSettingId } from "../consts.ts";

export function reflectSettings(settings: Settings) {
  const choicesElement = document.getElementById(colorModeSettingId);
  if (!choicesElement) {
    unreachable();
  }

  const choices = (choicesElement as HTMLSelectElement).options;

  if (settings.getColorMode === ColorMode.Light) {
    choices[0].selected = true;
  } else if (settings.getColorMode === ColorMode.DarkBlueAndBlack) {
    choices[1].selected = true;
  }
}

export function settingsEventListener() {
  const colorModeSettingElement = document.getElementById(colorModeSettingId);

  if (!colorModeSettingElement) {
    unreachable();
  }

  const colorModeSetting = colorModeSettingElement as HTMLSelectElement;

  colorModeSetting.addEventListener("change", async (event) => {
    event.preventDefault();
    await chrome.storage.local.set({
      [colorModeSettingKeyForStorage]: colorModeSetting.value,
    });
  });
}
