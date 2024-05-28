import { zombiesNumId } from "../consts.ts";

export function hide(element: HTMLElement) {
  element.style.display = "none";
}

export function showFlex(element: HTMLElement) {
  element.style.display = "flex";
}

export function showBlock(element: HTMLElement) {
  element.style.display = "block";
}

export function setZombiesNum(num: number) {
  const zombiesNum = document.getElementById(zombiesNumId);
  if (zombiesNum) {
    zombiesNum.textContent = num.toString();
  }
}
