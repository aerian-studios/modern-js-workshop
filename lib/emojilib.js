let emojiCache;

export const fetchEmojis = async () => {
  if (!emojiCache) {
    const response = await fetch(
      "https://cdn.emojidex.com/static/utf_emoji.json"
    );
    emojiCache = response.json();
  }
  return emojiCache;
};

const isTheRightEmoji = (emoji, name) => emoji.code === name;

export const getTheMoji = emoji => emoji.moji;

export async function getEmoji(name) {
  const emojis = await fetchEmojis();
  const emoji = emojis.find(item => isTheRightEmoji(item, name));
  if (emoji) {
    return getTheMoji(emoji);
  }
  return "";
}

export const allYourBase = async base => {
  const emojis = await fetchEmojis();

  return emojis
    .filter(item => item.base === base)
    .reduce((previous, current) => previous + getTheMoji(current), "");
};

export const insertEmoji = async emoji => {
  const h1 = document.getElementById("heading");
  h1.innerHTML = emoji;
};
