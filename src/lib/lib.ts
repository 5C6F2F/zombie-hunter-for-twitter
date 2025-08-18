export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function unreachable(msg?: string): never {
  if (msg) {
    throw new Error(`entered unreachable code: ${msg}`);
  } else {
    throw new Error(`entered unreachable code`);
  }
}
