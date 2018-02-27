import { getEmoji } from "./lib/emojilib.js";

export const defaultMessage = "I don't know what I like, help me choose";
export const labelText = "Select your favourite emoji";
export const emojitronValues = [
  "sign of the horns",
  "guardsman",
  "joy",
  "raised hand with part between middle and ring fingers"
];

// Step 1
export const setHeadingText = message => {
  if (!document.getElementById("heading"))
    document.body.innerHTML = "<h1 id='heading'></h1>";

  const h1 = document.getElementById("heading");

  h1.textContent = message;
  return h1;
};

// Step 2 & 3
// export const setUpEmojitron = () => {
//     const emojitron = document.createElement('form')

//     emojitron.id = 'emojitron';
//     emojitron.setAttribute('action', '#');

//     emojitron.innerHTML = `<div class="input-wrap input-select"></div>`;

//     document.body.appendChild(emojitron);
// }

const createEmojiOptionElements = async emojis => {
  const emojiDex = await Promise.all(
    emojis.map(async emoji => {
      const theEmoji = await getEmoji(emoji);
      return theEmoji;
    })
  );

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

const createLabel = id => {
  const label = document.createElement("label");
  label.textContent = labelText;

  label.setAttribute("for", id);
  return label;
};

const setupEmojitronEvents = function emojiTronEvents() {
  const select = document.getElementById("emoji-select");

  select.onchange = () => {
    setHeadingText(select.value);
    select.blur();
  };

  select.addEventListener("focus", handleFocus, false);
  select.addEventListener("blur", handleFocus, false);
};

// Step 4
export const setUpEmojitron = async () => {
  const emojitron = document.createElement("form");

  emojitron.id = "emojitron";
  emojitron.setAttribute("action", "#");
  emojitron.innerHTML = `<div class="uninitialised"></div>`;

  emojitron.children[0].classList.add("input-wrap", "input-select");
  emojitron.querySelector("div").classList.remove("uninitialised");

  // select contents
  const divWrapper = emojitron.querySelector(".input-select");
  const select = await createEmojiSelectEl();
  const label = createLabel(select.id);

  divWrapper.append(select);
  divWrapper.prepend(label);
  document.body.append(emojitron);

  setupEmojitronEvents();

  return emojitron;
};

export default function run() {
  setHeadingText(defaultMessage);
  setUpEmojitron();
}
