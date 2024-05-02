import { bundle } from "https://deno.land/x/emit@0.38.2/mod.ts";

{
  const url = new URL(import.meta.resolve("./src/content/main.ts"));
  const { code } = await bundle(url);
  await Deno.mkdir("./dist/content", { recursive: true });
  await Deno.writeTextFile("./dist/content/main.js", code);
}
{
  const url = new URL(import.meta.resolve("./src/popup/main.ts"));
  const { code } = await bundle(url);
  await Deno.mkdir("./dist/popup", { recursive: true });
  await Deno.writeTextFile("./dist/popup/main.js", code);
}
