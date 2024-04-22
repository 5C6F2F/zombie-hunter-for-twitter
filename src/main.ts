import { addHideButtons } from "./addHideButtons.ts";
import { hideUsers, initHideUserIds } from "./hideUsers/hideUsers.ts";

initHideUserIds();

setInterval(addHideButtons, 500);
setInterval(hideUsers, 500);
