import { nextButtonSelector } from "../consts.ts";

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export async function goNextPage() {
  let nextButton = document.querySelector(nextButtonSelector);
  while (!nextButton) {
    nextButton = document.querySelector(nextButtonSelector);
    await sleep(200);
  }
  click(nextButton);
}

export function click(element: Element) {
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(clickEvent);
}
