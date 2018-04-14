import * as React from "react";
import { EmojiKey } from "./EmojiKey";
import { Emoji } from "./Emoji";

interface Props {
    emojis: Emoji[];
    onAddEmoji: (moji: string) => void;
}
export const EmojiKeyboard: React.SFC<Props> = ({ emojis, onAddEmoji }) => (
    <div id="keyboard">
        {emojis.map((emoji) => (
            <EmojiKey key={emoji.code} emoji={emoji} onAddEmoji={onAddEmoji} />
        ))}
    </div>
);
