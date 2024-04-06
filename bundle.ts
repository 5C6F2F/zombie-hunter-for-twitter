import { bundle } from "https://deno.land/x/emit@0.38.2/mod.ts";

const url = new URL(import.meta.resolve("./src/main.ts"));
const { code } = await bundle(url);
Deno.writeTextFile("./dist/main.js", code);
