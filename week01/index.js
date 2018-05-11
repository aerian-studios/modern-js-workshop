import emojis from "../lib/emoji.js";

const isTheRightEmoji = (emoji, name) => emoji.code === name;

export function getEmoji(name) {
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));

    if (emoji) {
        return emoji.moji;
    }

    return false;
}

export default function run() {
    // eslint-disable-next-line no-console
    console.log(getEmoji("heart eyes cat"));
}
