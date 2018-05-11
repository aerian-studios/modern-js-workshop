import * as React from "react";
import { compose } from "../lib/compose";
import { Emoji } from "./Emoji";
import { Key, KeyProps } from "./Key";
import { withLogger } from "./withLogger";
import { withRedBorder } from "./withRedBorder";

interface Props {
    emoji: Emoji;
    onAddEmoji: (moji: string) => void;
    disabled: boolean;
}
const withRedLogging = compose(withLogger, withRedBorder);
const RedLoggingKey = withRedLogging(Key);
export const EmojiKey: React.SFC<Props & Partial<KeyProps>> = ({
    emoji,
    onAddEmoji,
    ...rest
}) => (
    <RedLoggingKey
        onClick={() => onAddEmoji(emoji.moji)}
        label={emoji.moji}
        {...rest}
    />
);
