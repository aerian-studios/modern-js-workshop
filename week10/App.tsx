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
    output: string;
    emojilist: Emoji[];
    categories: string[];
    filteredEmojis: Emoji[];
    selectedCategory: string;
}

interface Props {}

const DEFAULT_CATEGORIES = getCategories(emojilist);
const DEFAULT_CATEGORY = DEFAULT_CATEGORIES[0];

const DEFAULT_STATE: State = {
    output: "Type your emoji",
    categories: DEFAULT_CATEGORIES,
    selectedCategory: DEFAULT_CATEGORY,
    filteredEmojis: emojilist.filter(makeAFilterByCategory(DEFAULT_CATEGORY)),
    emojilist,
};

export class App extends React.Component<Props, State> {
    public readonly state = DEFAULT_STATE;

    public componentDidMount() {
        this.loadRemoteEmojis();
    }

    public loadRemoteEmojis = async () => {
        const emojis = await fetchEmojis();
        this.setState(
            { emojilist: emojis, categories: getCategories(emojis) },
            () => this.updateCategory(this.state.categories[0])
        );
    };

    public clear = () => this.setState({ output: DEFAULT_STATE.output });
    public addEmoji = (moji: string) => {
        let output = moji;
        if (this.state.output !== DEFAULT_STATE.output) {
            output = this.state.output + moji;
        }
        this.setState({ output });
    };

    public updateCategory = (selectedCategory: string) => {
        this.setState({
            selectedCategory,
            filteredEmojis: this.state.emojilist.filter(
                makeAFilterByCategory(selectedCategory)
            ),
        });
    };

    public onCategoryChange = (event: React.FormEvent<HTMLSelectElement>) =>
        this.updateCategory(event.currentTarget.value);

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                />
                <button onClick={this.clear}>Clear</button>
                <EmojiKeyboard
                    emojis={this.state.filteredEmojis}
                    onAddEmoji={this.addEmoji}
                />
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
}
