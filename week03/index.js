import { allYourBase, insertEmoji } from "../lib/emojilib.js";

export default async function run() {
    insertEmoji(await allYourBase("guardsman"));
}
