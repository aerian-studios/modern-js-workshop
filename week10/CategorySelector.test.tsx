import * as React from "react";
import * as renderer from "react-test-renderer";
import { CategorySelector } from "./CategorySelector";

it("creates a category selector", () => {
    const categories = ["objects", "faces", "people"];

    const tree = renderer
        .create(<CategorySelector categories={categories} />)
        .toJSON();
    expect(tree).toMatchSnapshot();

    expect(tree!.children!.length).toBe(categories.length);
    expect(tree!.children![1].props.value).toEqual("faces");
    expect(tree!.children![1].children![0]).toEqual("Faces");
});

it("handles onChange", () => {
    const categories = ["objects", "faces", "people"];

    const change = jest.fn();

    const tree = renderer
        .create(<CategorySelector categories={categories} onChange={change} />)
        .toJSON();

    if (tree) {
        tree.props.onChange();
    }
    expect(change).toHaveBeenCalled();
});
