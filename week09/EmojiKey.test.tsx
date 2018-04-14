import * as React from "react";
import { EmojiKey } from "./EmojiKey";
import * as renderer from "react-test-renderer";

const emoji = {
    code: "ski",
    moji: "🎿",
    unicode: "1f3bf",
    category: "objects",
    tags: [],
    link: null,
    base: "ski",
    variants: ["ski"],
    score: 0,
    r18: false,
    customizations: [],
    combinations: [],
};

const onAddEmoji = jest.fn();

it("renders correctly", () => {
    const tree = renderer
        .create(<EmojiKey emoji={emoji} onAddEmoji={onAddEmoji} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it("calls the callback with the right moji when clicked", () => {
    const tree = renderer
        .create(<EmojiKey emoji={emoji} onAddEmoji={onAddEmoji} />)
        .toJSON();
    if (tree) {
        tree.props.onClick();
    }
    expect(onAddEmoji).toHaveBeenCalledWith(emoji.moji);
});
