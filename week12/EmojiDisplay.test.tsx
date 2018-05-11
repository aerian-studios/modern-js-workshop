import * as React from "react";
import * as renderer from "react-test-renderer";

import { EmojiDisplay } from "./EmojiDisplay";

it("renders correctly", () => {
    const tree = renderer
        .create(<EmojiDisplay>Hello everyone</EmojiDisplay>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
