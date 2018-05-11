import emojis from "../lib/emoji.js";
import { getCategories, makeSelect } from "./index.js";

const html = `<select><option value="Choose a category...">Choose a category...</option><option value="faces">Faces</option><option value="gestures">Gestures</option><option value="objects">Objects</option><option value="people">People</option><option value="transportation">Transportation</option></select>`;

it("gets categories", () => {
    const categories = getCategories(emojis);

    expect(categories).toEqual([
        "objects",
        "faces",
        "gestures",
        "transportation",
        "people",
    ]);
});

it("generates a select", () => {
    const categories = getCategories(emojis);

    const select = makeSelect(categories);

    expect(select.outerHTML).toEqual(html);
});
