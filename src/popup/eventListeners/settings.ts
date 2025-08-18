import { colorModeSettingKeyForStorage } from "../../lib/consts.ts";
import { unreachable } from "../../lib/lib.ts";
import { colorModeSettingId } from "../consts.ts";

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
