export const enum ColorMode {
  Light,
  DarkBlueAndBlack,
}

export class Settings {
  private colorMode: ColorMode;

  constructor(fetchedSettings: ColorMode) {
    this.colorMode = fetchedSettings;
  }

  get getColorMode(): ColorMode {
    return this.colorMode;
  }
}
