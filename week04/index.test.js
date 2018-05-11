import "isomorphic-unfetch";

import {
    setHeadingText,
    defaultHeading,
    setupEmojitron,
    labelText,
    emojitronValues,
} from ".";

describe("Emojitron creates an emoji selector with sensible defaults", () => {
    beforeEach(() => {
        document.body.innerHTML = "<h1 id='heading'></h1>";
    });

    it("Has a default value in the heading", async () => {
        const h1 = document.getElementById("heading");

        setHeadingText(defaultHeading);
        expect(h1.textContent).toEqual(defaultHeading);
    });

    it("has a form with the id 'emojitron'", async () => {
        await setupEmojitron();

        const emojitron = document.getElementById("emojitron");

        expect(document.forms.length).toBeGreaterThan(0);

        expect(emojitron).toBeTruthy();
        expect(document.forms[0]).toBe(emojitron);
    });

    it("has a select element", async () => {
        await setupEmojitron();
        const selectEl = document.querySelector("select");

        expect(selectEl).toBeTruthy();
    });

    it("has a label", async () => {
        await setupEmojitron();
        const labels = document.querySelectorAll("label");

        expect(labels.length).toBeGreaterThan(0);

        expect(labels[0].hasAttribute("for")).toBeTruthy();
        expect(labels[0].getAttribute("for")).toEqual("emoji-select");
        expect(labels[0].textContent).toEqual(labelText);
    });

    it("has multiple option elements", async () => {
        await setupEmojitron();
        const selectEl = document.querySelector("select");

        expect(selectEl.options.length).toBeGreaterThanOrEqual(
            emojitronValues.length
        );
    });

    it("sets the heading when a user selects an emoji", async () => {
        await setupEmojitron();
        const selectEl = document.querySelector("select");
        const h1 = document.getElementById("heading");

        selectEl.selectedIndex = 1;
        selectEl.dispatchEvent(new Event("change"));
        expect(h1.textContent).toEqual("🤘");
    });

    it("matches the snapshot", async () => {
        await setupEmojitron();
        expect(document.body.innerHTML).toMatchSnapshot();
    });
});
