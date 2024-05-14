import { DEBUG } from "../const.js";

export default function (message) {
  if (DEBUG == true) { console.log(message); }
}