import { ColorMode } from "../lib/settings.ts";
import { colorModeSettingKeyForStorage } from "./consts.ts";

export async function fetchSettingsFromStorage(): Promise<ColorMode> {
  const settings = await chrome.storage.local.get(
    colorModeSettingKeyForStorage,
  );
  const value = settings[colorModeSettingKeyForStorage];

  return parseColorModeFromStorage(value);
}

export async function saveSettingsToStorage(value: string) {
  await chrome.storage.local.set({
    [colorModeSettingKeyForStorage]: value,
  });
}

function parseColorModeFromStorage(value: string): ColorMode {
  if (value === "light") {
    return ColorMode.Light;
  } else if (value === "dark-blue-and-black") {
    return ColorMode.DarkBlueAndBlack;
  } else {
    // 未設定の場合、デフォルトはライトモード
    return ColorMode.Light;
  }
}
