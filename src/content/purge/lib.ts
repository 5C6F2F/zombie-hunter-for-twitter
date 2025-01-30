import { nextButtonSelector } from "../consts.ts";
import { click, querySelectorLoop } from "../lib.ts";

export async function goNextPage() {
  const nextButton = await querySelectorLoop(document, nextButtonSelector);
  click(nextButton);
}
