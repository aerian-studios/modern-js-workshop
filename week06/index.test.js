import emojis from "../lib/emoji.js";
import {
    calculateCubeFromSquare,
    calculateBaseFromSquare,
    calculateCube,
    getFacesEmojiString,
    getGesturesEmojiString,
} from "./index.js";

import {
    makeExtractFunctionByCategory,
    extractMojis,
    join,
} from "../lib/emojilib.js";

import { facesString, gesturesString } from "./fixtures.js";
import { compose } from "../lib/compose.js";

it("calculates cubes from square numbers", () => {
    expect(calculateCubeFromSquare(25)).toEqual(125);
});

it("calculates the base of a square number", () => {
    const three = calculateBaseFromSquare(9);

    expect(three).toEqual(3);
});

it("calculates the cube of a base number", () => {
    const three = calculateBaseFromSquare(9);
    const twentySeven = calculateCube(three);
    expect(twentySeven).toEqual(27);
});

it("pulls out all faces from the category 'faces'", () => {
    expect(getFacesEmojiString(emojis)).toEqual(facesString);
});

it("pulls out all gestures from the category 'gestures'", () => {
    expect(getGesturesEmojiString(emojis)).toEqual(gesturesString);
});

it("filters by the category passed in", () => {
    const categoryGetter = compose(
        join,
        extractMojis,
        makeExtractFunctionByCategory("gestures")
    );
    expect(categoryGetter(emojis)).toEqual(gesturesString);
});
