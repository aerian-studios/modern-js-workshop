import emojis from "./lib/emoji.js";
export function run() {
    console.log(getEmoji("heart eyes cat"));
}

const isTheRightEmoji = (emoji, name) => {
    return emoji.code === name;
}

export function getEmoji(name) {
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    if (emoji) {
        return emoji.moji;
    }
}