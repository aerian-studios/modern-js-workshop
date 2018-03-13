import emojis from "../lib/emoji.js";

interface Emoji {
  code: string;
  moji: string; // this is an emoji
  [key: string]: any;
}

const isTheRightEmoji = (emoji: Emoji, name: string): boolean =>
  emoji.code === name;

export function getEmoji(name: string): string | false {
  const myEmojis: Emoji[] = emojis;
  const emoji = myEmojis.find(item => isTheRightEmoji(item, name));
  if (emoji) {
    return emoji.moji;
  }
  return false;
}

export default function run() {
  // eslint-disable-next-line no-console
  console.log(getEmoji("heart eyes cat"));
}
