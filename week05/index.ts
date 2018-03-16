import emojis from "../lib/emoji.js";

interface Emoji {
  code: string;
  moji: string;
}

const isTheRightEmoji = (emoji: Emoji, name: string) => emoji.code === name;

export function getEmoji(name: string) {
  const emoji: Emoji | undefined = emojis.find(item =>
    isTheRightEmoji(item, name)
  );
  if (emoji) {
    return emoji.moji;
  }
  return false;
}

export default function run() {
  // eslint-disable-next-line no-console
  console.log(getEmoji("heart eyes cat"));
}
