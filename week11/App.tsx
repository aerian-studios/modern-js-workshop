import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

import emojilist from "../lib/emoji";
import {
    fetchEmojis,
    getCategories,
    makeAFilterByCategory,
} from "../lib/emojilib";
import { CategorySelector } from "./CategorySelector";
import { Emoji } from "./Emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";
interface State {
    output: string[];
    currentEmojilist: Emoji[];
    categories: string[];
    filteredEmojis: Emoji[];
    selectedCategory: string;
}

interface Props {}

const DEFAULT_CATEGORIES: string[] = getCategories(emojilist);
const DEFAULT_CATEGORY = DEFAULT_CATEGORIES[0];

let remoteEmojilist: Emoji[] = [];

const DEFAULT_STATE: State = {
    output: ["Type your emoji"],
    categories: DEFAULT_CATEGORIES,
    selectedCategory: DEFAULT_CATEGORY,
    filteredEmojis: emojilist.filter(makeAFilterByCategory(DEFAULT_CATEGORY)),
    currentEmojilist: emojilist,
};

export class App extends React.Component<Props, State> {
    public readonly state = DEFAULT_STATE;

    public toggleEmojilist = () => {
        if (!remoteEmojilist.length) {
            return this.loadRemoteEmojis();
        }

        const currentEmojilist =
            this.state.currentEmojilist === emojilist
                ? remoteEmojilist
                : emojilist;
        return this.setState(
            {
                currentEmojilist,
                categories: getCategories(currentEmojilist),
            },
            () => this.updateCategory(this.state.selectedCategory)
        );
    };

    public loadRemoteEmojis = async () => {
        remoteEmojilist = await fetchEmojis();
    };

    public clear = () => this.setState({ output: DEFAULT_STATE.output });
    public addEmoji = (moji: string) => {
        let output = [moji];
        if (this.state.output !== DEFAULT_STATE.output) {
            output = [...this.state.output, moji];
        }
        this.setState({ output });
    };

    public removeEndEmoji = () => {
        if (this.state.output.length > 1) {
            return this.setState({
                output: this.state.output.splice(
                    0,
                    this.state.output.length - 1
                ),
            });
        }
        return this.setState({ output: DEFAULT_STATE.output });
    };

    public updateCategory = (selectedCategory: string) => {
        this.setState({
            selectedCategory,
            filteredEmojis: this.state.currentEmojilist.filter(
                makeAFilterByCategory(selectedCategory)
            ),
        });
    };

    public changeCategory = () => this.updateCategory(this.state.categories[3]);

    public onCategoryChange = (event: React.FormEvent<HTMLSelectElement>) =>
        this.updateCategory(event.currentTarget.value);

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                    value={this.state.selectedCategory}
                />
                <button onClick={this.clear}>Clear</button>
                <button onClick={this.removeEndEmoji}>⬅️ Delete</button>
                <button onClick={this.toggleEmojilist}>
                    {!remoteEmojilist.length
                        ? "Load more!"
                        : this.state.currentEmojilist === emojilist
                            ? "use remote emojis"
                            : "use local emojis"}
                </button>
                <EmojiKeyboard
                    emojis={this.state.filteredEmojis}
                    onAddEmoji={this.addEmoji}
                    clickedKeys={this.state.output}
                />
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
}
