import emojiList from "../lib/emoji.js";
import {
    extractMojis,
    makeExtractFunctionByCategory,
} from "../lib/emojilib.js";

import { pipe } from "../lib/compose.js";

export const appendToTitle = (text) => {
    document.getElementById("heading").textContent += text;
};

export const makeClickHandler = (littlePictureOfSomethingji) => {
    return () => {
        appendToTitle(littlePictureOfSomethingji);
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

export const makeKeysFromEmojiListByCategory = (category) =>
    pipe(makeExtractFunctionByCategory(category), extractMojis, makeButtons);

export const updateKeyboard = (keys) => {
    const div = document.querySelector("form div");
    div.innerHTML = "";
    keys.forEach((key) => div.appendChild(key));
};

export const createKeyboard = (emojis) => {
    const form = document.getElementById("keyboard");
    form.innerHTML = "<div />";
    const makeKeysFromEmojiList = makeKeysFromEmojiListByCategory("faces");
    const buttons = makeKeysFromEmojiList(emojis);
    updateKeyboard(buttons);
};

export const run = () => {
    createKeyboard(emojiList);
};

export default run;
