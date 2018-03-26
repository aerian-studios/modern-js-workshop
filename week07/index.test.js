import {
    appendToTitle,
    createKeyboard,
    makeButton,
    makeButtons,
} from "./index.js";
import emojis from "../lib/emoji.js";

it("appends to the title", () => {
    document.body.innerHTML = "<h1 id='heading'></h1>";
    appendToTitle("Hello");
    expect(document.querySelector("h1").textContent).toEqual("Hello");
    appendToTitle("World");
    expect(document.querySelector("h1").textContent).toEqual("HelloWorld");
});

it("creates buttons in the form", () => {
    document.body.innerHTML =
        "<h1 id='heading'></h1><form id='keyboard'></form>";
    createKeyboard(emojis);
    expect(document.querySelector("form button")).toBeTruthy();
});

it("creates a button", () => {
    const button = makeButton("😻");
    expect(button).toMatchSnapshot();
});

it("creates lots of buttons", () => {
    const buttons = makeButtons(emojis);
    expect(buttons.length).toEqual(emojis.length);
});
