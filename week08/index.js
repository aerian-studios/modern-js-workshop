import { pipe } from "../lib/compose.js";
import emojiList from "../lib/emoji.js";
import {
    extractMojis,
    makeExtractFunctionByCategory,
} from "../lib/emojilib.js";

export const appendToTitle = (text) => {
    document.getElementById("heading").textContent += text;
};

export const makeClickHandler = (character) => () => {
    appendToTitle(character);

    return false;
};

export const makeButton = (moji) => {
    const button = document.createElement("button");

    button.textContent = moji;
    button.onclick = makeClickHandler(moji);

    return button;
};

export const getCategories = (emojis) =>
    Array.from(
        emojis.reduce((set, emoji) => set.add(emoji.category), new Set())
    );

export const ucfirst = (word) => word[0].toUpperCase() + word.slice(1);

export const makeSelect = (categories) =>
    ["Choose a category...", ...categories.sort()].reduce((select, item) => {
        const option = document.createElement("option");

        option.value = item;
        option.textContent = ucfirst(item);
        select.append(option);

        return select;
    }, document.createElement("select"));

export const makeButtons = (mojis) => mojis.map(makeButton);

export const setKeys = (keys) => {
    const div = document.querySelector("form div");

    div.innerHTML = "";
    keys.forEach((key) => div.appendChild(key));
};

export const getKeyMaker = (emojis) => (category) => {
    const makeKeysFromEmojiList = pipe(
        makeExtractFunctionByCategory(category),
        extractMojis,
        makeButtons
    );

    return makeKeysFromEmojiList(emojis);
};

export const createKeyboard = (emojis) => {
    const form = document.getElementById("keyboard");

    form.innerHTML = "<div />";
    const categories = getCategories(emojis);
    const getKeys = getKeyMaker(emojis);
    const select = makeSelect(categories);

    select.onchange = () => setKeys(getKeys(select.value));
    form.prepend(select);
};

export const run = async () => {
    // const emojis = await fetchEmojis();
    // createKeyboard(emojis);
    createKeyboard(emojiList);
};

export default run;
