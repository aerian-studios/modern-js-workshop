import * as React from "react";
import { Emoji } from "./Emoji";

interface Props {
    emoji: Emoji;
    onAddEmoji: (moji: string) => void;
    disabled: boolean;
}

export const EmojiKey: React.SFC<Props> = ({ emoji, onAddEmoji, disabled }) => (
    <button onClick={() => onAddEmoji(emoji.moji)} disabled={disabled}>
        {emoji.moji}
    </button>
);
