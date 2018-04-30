// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import * as renderer from "react-test-renderer";
// import { App } from "./App";

// it("renders without crashing", () => {
//     const run = () => {
//         const div = document.createElement("div");
//         ReactDOM.render(<App />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     };
//     expect(run).not.toThrow();
// });

// it("renders all the components we need", () => {
//     const tree = renderer.create(<App />).toJSON();
//     let treeChildrenLength = 0;

//     if (tree && tree.children) {
//         treeChildrenLength = tree.children.length;
//     }

//     expect(treeChildrenLength).toBeGreaterThanOrEqual(2);
//     expect(tree).toMatchSnapshot();
// });

// it("removes an emoji from the end of the output when delete is pressed", () => {
//     const state: State = {
//         output: ["Default output"],
//         emojilist: [],
//         categories: [],
//         filteredEmojis: [],
//         selectedCategory: "",
//     };

//     const props: Props = {};
//     const app = new App(state, props);

//     app.setState = jest.fn();
//     app.addEmoji("😻");
//     app.removeEndEmoji();

//     expect(app.setState).toHaveBeenCalledWith({
//         output: ["Default output"],
//     });
// });
