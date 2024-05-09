import { nextButtonSelector } from "../consts.ts";

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function goNextPage() {
  const nextButton = document.querySelector(nextButtonSelector);
  if (!nextButton) {
    return;
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
