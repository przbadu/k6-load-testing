import { DEBUG } from "./config.js";

export default function (message) {
  if (DEBUG == true) { console.log(message); }
}