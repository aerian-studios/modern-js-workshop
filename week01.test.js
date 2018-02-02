import { getEmoji } from "./week01.js";

it("returns an emoji when passed name", () => {
    expect(getEmoji("heart eyes cat")).toEqual("😻");
});