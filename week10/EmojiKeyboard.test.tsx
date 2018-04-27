import * as React from "react";
import * as renderer from "react-test-renderer";
import emojilist from "../lib/emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";

it("renders correctly", () => {
    const tree = renderer
        .create(<EmojiKeyboard emojis={emojilist} onAddEmoji={() => {}} />)
        .toJSON();

    let treeChildrenLength = 0;
    if (tree && tree.children) {
        treeChildrenLength = tree.children.length;
    }

    expect(tree).toMatchSnapshot();
    expect(treeChildrenLength).toBe(emojilist.length);
});
