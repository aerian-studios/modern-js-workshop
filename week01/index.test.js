import { getEmoji } from ".";

it("returns an emoji when passed name", () => {
  expect(getEmoji("heart eyes cat")).toEqual("😻");
});
