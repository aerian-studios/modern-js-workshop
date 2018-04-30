import * as React from "react";
import { Emoji } from "./Emoji";
import { EmojiKey } from "./EmojiKey";

interface Props {
    emojis: Emoji[];
    onAddEmoji: (moji: string) => void;
    clickedKeys: string[];
}
export const EmojiKeyboard: React.SFC<Props> = ({
    emojis,
    onAddEmoji,
    clickedKeys,
}) => (
    <div id="keyboard">
        {emojis.map((emoji: Emoji) => (
            <EmojiKey
                key={emoji.code}
                emoji={emoji}
                onAddEmoji={onAddEmoji}
                disabled={
                    clickedKeys.filter((moji) => moji === emoji.moji).length >=
                    3
                }
            />
        ))}
    </div>
);
