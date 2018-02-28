import "isomorphic-unfetch";
import {
  defaultMessage,
  setHeadingText,
  setUpEmojitron,
  emojitronValues,
  labelText
} from "./week04.js";

jest.mock("isomorphic-unfetch");

// eslint-disable-next-line no-unused-vars
const formTemplate = `<form id="emojitron" action="#">
    <div class="input-wrap input-select">
        <label for="emoji-select">Select your favourite emoji</label>
        <select id="emoji-select" class=""><option>Select an emoji</option>
            <option value="🤘">🤘</option>
            <option value="💂">💂</option>
            <option value="😂">😂</option>
            <option value="🖖">🖖</option>
        </select>
    </div>
</form>`;

beforeEach(() => {
  document.body.innerHTML = "<h1 id='heading'></h1>";
});

afterEach(() => {
  const form = document.getElementById("emojitron");

  if (form) form.remove();
});

describe("Emojitron creates an emoji selector with sensible defaults", () => {
  it("Has a default value in the heading", () => {
    const h1 = document.getElementById("heading");

    setHeadingText(defaultMessage);

    expect(h1.textContent).toBe(defaultMessage);
  });

  it("Has a form ith id 'emojitron'", async () => {
    await setUpEmojitron();

    const emojitron = document.getElementById("emojitron");

    expect(document.forms.length).toBeGreaterThan(0);
    expect(emojitron).toBeTruthy();
    expect(emojitron).toBe(document.forms[0]);
  });

  it("Has a <select> element", async () => {
    await setUpEmojitron();

    const selectEl = document.querySelector("select");

    expect(selectEl).toBeTruthy();
  });

  it("The select has a proper label", async () => {
    await setUpEmojitron();

    // using all selector for demonstration puroses only
    const label = document.querySelectorAll("label");

    expect(label.length).toBeGreaterThan(0);
    expect(label[0].hasAttribute("for")).toBeTruthy();
    expect(label[0].getAttribute("for")).toEqual("emoji-select");
    expect(label[0].textContent).toBe(labelText);
  });

  it("The <select> element has multiple <option> elements", async () => {
    await setUpEmojitron();

    const selectEl = document.querySelector("select");

    expect(selectEl.classList.contains("uninitialised")).toBeFalsy();
    expect(selectEl.options.length).toBeGreaterThanOrEqual(
      emojitronValues.length
    );
  });

  it("Sets the heading when the user selects an emoji", async () => {
    await setUpEmojitron();

    const selectEl = document.querySelector("select");

    selectEl.selectedIndex = 1;

    const h1 = document.getElementById("heading");
    selectEl.dispatchEvent(new Event("change"));

    expect(h1.textContent).toEqual("🤘");
  });

  it("matches the snapshot", async () => {
    await setUpEmojitron();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
