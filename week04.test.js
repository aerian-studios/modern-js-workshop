import "isomorphic-unfetch";
import { insertEmoji, allYourBase } from "./lib/emojilib.js";
import { defaultMessage, setDefaultHeading, setUpEmojitron, emojitronValues } from './week04.js';

jest.mock("isomorphic-unfetch");

const formTemplate = `<form id=”emojitron” action=”#”><div class="input-wrap input-select">
<label for="emoji-selector">Select you emoji base:</label>
<select name="emoji-selector" id="emoji-selector">
    <option value="sign_of_the_horns"></option>
    <option value="guardsman"></option>
    <option value="...">...</option>
</select>
</div></form>`;

afterEach(() => {
    const form = document.getElementById('emojitron');

    form && form.remove();

    const h1 = document.getElementById('heading');

    h1 && h1.textContent = '';
});

describe('Emojitron creates an emoji selector with sensible defaults', () => {
    it("Has a default value in the heading", () => {
        document.body.innerHTML = "<h1 id='heading'></h1>";
        const h1 = document.getElementById('heading');
    
        setDefaultHeading(defaultMessage);
    
        expect(h1.textContent).toBe(defaultMessage);
    });
    
    it("Has a form ith id 'emojitron'", async () => {
        await setUpEmojitron();
    
        expect(document.forms.length).toBeGreaterThan(0);
        expect(document.getElementById('emojitron')).toBeTruthy();
        expect(document.getElementById('emojitron')).toBe(document.forms[0]);
        
    });
    
    it("Has a <select> element", async () => {
        await setUpEmojitron();
    
        const selectEl = document.querySelector('select');

        expect(selectEl).toBeTruthy();
    });

    it("The <select> element has multiple <option> elements", async () => {
        await setUpEmojitron();
    
        const selectEl = document.querySelector('select');

        expect(selectEl.options.length).toBeGreaterThanOrEqual(emojitronValues.length);
    });
})