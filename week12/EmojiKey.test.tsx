import * as React from "react";
import * as renderer from "react-test-renderer";
import { EmojiKey } from "./EmojiKey";

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
        .create(
            <EmojiKey emoji={emoji} onAddEmoji={onAddEmoji} disabled={false} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree && tree.children && tree.children[0]).toBe(emoji.moji);
});

it("calls the callback with the right moji when clicked", () => {
    const tree = renderer
        .create(
            <EmojiKey emoji={emoji} onAddEmoji={onAddEmoji} disabled={false} />
        )
        .toJSON();
    if (tree) {
        tree.props.onClick();
    }
    expect(onAddEmoji).toHaveBeenCalledWith(emoji.moji);
});
