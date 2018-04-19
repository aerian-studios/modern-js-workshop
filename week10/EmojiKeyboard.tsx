import * as React from "react";
import { Emoji } from "./Emoji";
import { EmojiKey } from "./EmojiKey";

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
