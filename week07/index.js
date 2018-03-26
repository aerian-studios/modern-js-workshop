import emojiList from "../lib/emoji.js";
import {
    extractMojis,
    makeExtractFunctionByCategory,
} from "../lib/emojilib.js";

import { pipe } from "../lib/compose.js";

export const appendToTitle = (text) => {
    document.getElementById("heading").textContent += text;
};

export const makeClickHandler = (character) => {
    return () => {
        appendToTitle(character);
        return false;
    };
};

export const makeButton = (moji) => {
    const button = document.createElement("button");
    button.textContent = moji;
    button.onclick = makeClickHandler(moji);
    return button;
};

export const makeButtons = (mojis) => mojis.map(makeButton);

export const setKeys = (keys) => {
    const div = document.querySelector("form div");
    div.innerHTML = "";
    keys.forEach((key) => div.appendChild(key));
};

export const createKeyboard = (emojis) => {
    const form = document.getElementById("keyboard");
    form.innerHTML = "<div />";
    const category = "faces";
    const makeKeysFromEmojiList = pipe(
        makeExtractFunctionByCategory(category),
        extractMojis,
        makeButtons
    );
    const buttons = makeKeysFromEmojiList(emojis);
    setKeys(buttons);
};

export const run = () => {
    createKeyboard(emojiList);
};

export default run;
