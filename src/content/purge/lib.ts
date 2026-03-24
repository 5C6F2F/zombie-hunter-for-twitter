import { nextButtonSelector } from "../consts.ts";
import { click, querySelectorLoop, DOMError } from "../lib.ts";
import { Result } from "../../lib/result.ts";

export async function goNextPage(): Promise<Result<Element, DOMError>> {
  const result = await querySelectorLoop(document, nextButtonSelector, 10);
  if (result.isSuccess) {
    click(result.value);
  }
  return result;
}
