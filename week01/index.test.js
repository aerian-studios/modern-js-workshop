import { getEmoji } from "./index";

it("returns an emoji when passed name", () => {
  expect(getEmoji("heart eyes cat")).toEqual("😻");
});
