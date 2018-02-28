import { getEmoji } from "./lib/emojilib.js";

export const defaultMessage = "I don't know how I feel!";
export const labelText = "Select your favourite emoji";
export const emojitronValues = [
  "sign of the horns",
  "guardsman",
  "joy",
  "raised hand with part between middle and ring fingers"
];

// Step 1
export const setHeadingText = message => {
  const h1 = document.getElementById("heading");

  h1.textContent = message;
  return h1;
};

const createEmojiOptionElements = async emojis => {
  const emojiDex = await Promise.all(emojis.map(getEmoji));

  const emojiKV = emojiDex.reduce(
    (prev, current) => `${prev}
        <option value="${current}">${current}</option>`,
    `<option>Select an emoji</option>`
  );

  return emojiKV;
};

export const createEmojiSelectEl = async () => {
  const select = document.createElement("select");
  select.id = "emoji-select";

  select.innerHTML = await createEmojiOptionElements(emojitronValues);

  return select;
};

export const handleFocus = event => {
  const select = event.currentTarget;

  select.classList.toggle("focussed");
};

export const createLabel = id => {
  const label = document.createElement("label");

  label.textContent = labelText;
  label.setAttribute("for", id);
  return label;
};

const setupEmojitronEvents = function emojiTronEvents() {
  const select = document.getElementById("emoji-select");

  // step 1
  select.onchange = () => {
    setHeadingText(select.value);
    // This after the next event listeners added
    select.blur();
  };

  // STEP 2: another way to add event listeners
  select.addEventListener("focus", handleFocus, false);
  select.addEventListener("blur", handleFocus, false);
};

// Step 2 & 3
// export const setUpEmojitron = () => {
//     // DOM creation
//   const emojitron = document.createElement("form");
//   emojitron.id = "emojitron";
//   emojitron.setAttribute("name", emojitron.id);
//   // innerHTML parses strings or will take an element
//   emojitron.innerHTML = `<div class="uninitialised"></div>`;

//     document.body.append(emojitron);
// }
// Step 4
export const setUpEmojitron = async () => {
  // DOM creation
  const emojitron = document.createElement("form");
  emojitron.id = "emojitron";
  emojitron.setAttribute("name", emojitron.id);
  // innerHTML parses strings or will take an element
  emojitron.innerHTML = `<div class="uninitialised"></div>`;

  // DOM Selection
  const divWrapper = emojitron.children[0];
  divWrapper.classList.add("input-wrap", "input-select");
  divWrapper.classList.remove("uninitialised");

  // Abstracted DOM creation
  const select = await createEmojiSelectEl();
  const label = createLabel(select.id);
  // DOM Manipulations
  divWrapper.append(select);
  divWrapper.prepend(label);
  const h1 = document.getElementById("heading");
  h1.after(emojitron);

  setupEmojitronEvents();

  return emojitron;
};

export default function run() {
  setHeadingText(defaultMessage);
  setUpEmojitron();
}
