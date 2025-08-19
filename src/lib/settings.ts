import { colorModeSettingKeyForStorage } from "./consts.ts";

export const enum ColorMode {
  Light,
  DarkBlueAndBlack,
}

export class Settings {
  private colorMode: ColorMode;

  constructor() {
    this.colorMode = ColorMode.Light;
  }

  async loadSettingsFromStorage(): Promise<this> {
    await new Promise<void>((resolve) => {
      chrome.storage.local.get(colorModeSettingKeyForStorage, (settings) => {
        this.colorMode = this.parseColorModeFromStorage(
          settings[colorModeSettingKeyForStorage],
        );
        resolve();
      });
    });

    return this;
  }

  private parseColorModeFromStorage(value: string): ColorMode {
    if (value === "light") {
      return ColorMode.Light;
    } else if (value === "dark-blue-and-black") {
      return ColorMode.DarkBlueAndBlack;
    } else {
      // 未設定の場合、デフォルトはライトモード
      return ColorMode.Light;
    }
  }

  get getColorMode(): ColorMode {
    return this.colorMode;
  }
}
