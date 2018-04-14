import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";
import * as renderer from "react-test-renderer";
it("renders correctly", () => {
    const tree = renderer
        .create(<EmojiDisplay>Hello everyone</EmojiDisplay>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
