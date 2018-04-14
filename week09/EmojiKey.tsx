import * as React from "react";
import { Emoji } from "./Emoji";

interface Props {
    emoji: Emoji;
    onAddEmoji: (moji: string) => void;
}

export const EmojiKey: React.SFC<Props> = ({ emoji, onAddEmoji }) => (
    <button onClick={() => onAddEmoji(emoji.moji)}>{emoji.moji}</button>
);
