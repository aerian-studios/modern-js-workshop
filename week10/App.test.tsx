import "isomorphic-unfetch";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as renderer from "react-test-renderer";
import { App } from "./App";

// it("renders without crashing", () => {
//     const run = () => {
//         const div = document.createElement("div");
//         ReactDOM.render(<App />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     };
//     expect(run).not.toThrow();
// });

it("renders all the components we need", () => {
    const app = renderer.create(<App />);
    const instance = app.getInstance();
    if (instance) {
        instance.componentDidMount = jest.fn();
    }
    const tree = app.toJSON();
    let treeChildrenLength = 0;

    if (tree && tree.children) {
        treeChildrenLength = tree.children.length;
    }

    expect(treeChildrenLength).toBeGreaterThanOrEqual(2);
    expect(tree).toMatchSnapshot();
});
