import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

import emojilist from "../lib/emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";

interface State {
    output: string;
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Type your emoji",
};
export class App extends React.Component<Props, State> {
    public state = DEFAULT_STATE;

    public addEmoji = (moji: string) => {
        let output = moji;
        if (this.state.output !== DEFAULT_STATE.output) {
            output = this.state.output + moji;
        }
        this.setState({ output });
    };

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKeyboard emojis={emojilist} onAddEmoji={this.addEmoji} />
            </div>
        );
    }
}
