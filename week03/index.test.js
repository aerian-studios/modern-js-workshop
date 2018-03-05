import "isomorphic-unfetch";
import { insertEmoji, allYourBase } from "../lib/emojilib.js";

jest.mock("isomorphic-unfetch");

it("inserts our emoji into the header", async () => {
  document.body.innerHTML = "<h1 id='heading'></h1>";
  const emojis = await allYourBase("guardsman");
  insertEmoji(emojis);
  expect(document.body.innerHTML).toMatchSnapshot();
});
