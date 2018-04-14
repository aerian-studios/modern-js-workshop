import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmojiTypewriter } from "./EmojiTypewriter";

it("renders without crashing", () => {
    const run = () => {
        const div = document.createElement("div");
        ReactDOM.render(<EmojiTypewriter />, div);
        ReactDOM.unmountComponentAtNode(div);
    };
    expect(run).not.toThrow();
});
