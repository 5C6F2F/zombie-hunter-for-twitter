import { sleep } from "../../lib/lib.ts";
import { nextButtonSelector } from "../consts.ts";
import { click } from "../lib.ts";

export async function goNextPage() {
  let nextButton = document.querySelector(nextButtonSelector);
  while (!nextButton) {
    await sleep(50);
    nextButton = document.querySelector(nextButtonSelector);
  }
  click(nextButton);
}
