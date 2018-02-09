
export async function run() {
    console.log(await allYourBase("sign_of_the_horns"));
}

const isTheRightEmoji = (emoji, name) => {
    return emoji.code === name;
}

export const getTheMoji = (emoji) => emoji.moji;

export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();

    return emojis.filter(( item ) => item.base === base)
                 .reduce((previous, current) =>  previous + getTheMoji(current), "");

}

export const fetchEmojis = async () => {
    const response = await fetch("https://cdn.emojidex.com/static/utf_emoji.json");
    return response.json();
}

export async function getEmoji(name) {
    const emojis = await fetchEmojis();
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    if (emoji) {
        return getTheMoji(emoji);
    }
}