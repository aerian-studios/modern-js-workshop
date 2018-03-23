let emojiCache;

export const fetchEmojis = async () => {
    if (!emojiCache) {
        emojiCache = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(
                    "https://cdn.emojidex.com/static/utf_emoji.json"
                );
                resolve(response.json());
            } catch (err) {
                reject(err);
            }
        });
    }
    return emojiCache;
};

const isTheRightEmoji = (emoji, name) => emoji.code === name;

export const getTheMoji = (emoji) => emoji.moji;

export async function getEmoji(name) {
    const emojis = await fetchEmojis();
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    if (emoji) {
        return getTheMoji(emoji);
    }
    return "";
}
export const join = (arr) => arr.join();

export const makeAFilterByCategory = (category) => (emoji) =>
    emoji.category === category;

export const makeExtractFunctionByCategory = (category) => (emojis) => {
    const myFilter = makeAFilterByCategory(category);
    return emojis.filter(myFilter);
};

export const extractMojis = (emojis) => emojis.map(getTheMoji);

export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();

    return emojis
        .filter((item) => item.base === base)
        .reduce((previous, current) => previous + getTheMoji(current), "");
};

export const insertEmoji = (emoji) => {
    const h1 = document.getElementById("heading");
    h1.innerHTML = emoji;
};
