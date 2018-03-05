import { getEmoji } from "../lib/emojilib.js";

export const defaultHeading = "I don't know how I feel!";
export const labelText = "Select your favourite emoji";
export const emojitronValues = [
  "sign of the horns",
  "guardsman",
  "joy",
  "raised hand with part between middle and ring fingers"
];

export const setHeadingText = message => {
  const h1 = document.getElementById("heading");
  h1.textContent = message;
};

export const createEmojiOptionElements = async emojis => {
  const emojiDex = await Promise.all(emojis.map(getEmoji));
  const emojiOptions = emojiDex
    .map(emoji => `<option value="${emoji}">${emoji}</option>`)
    .join();
  return `<option>Select an emoji</option>
    ${emojiOptions}`;
};

export const createEmojiSelect = async emojis => {
  const selectEl = document.createElement("select");
  selectEl.id = "emoji-select";
  selectEl.innerHTML = await createEmojiOptionElements(emojis);
  return selectEl;
};

export const createLabel = (id, content) => {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = content;
  return label;
};

export const handleFocus = event => {
  const select = event.currentTarget;
  select.classList.toggle("focussed");
};

export const setupEmojitronEvents = selectEl => {
  // eslint-disable-next-line no-param-reassign
  selectEl.onchange = () => {
    setHeadingText(selectEl.value);
    selectEl.blur();
  };

  selectEl.addEventListener("focus", handleFocus, false);
  selectEl.addEventListener("blur", handleFocus, false);
};

export const setupEmojitron = async () => {
  const emojitron = document.createElement("form");
  emojitron.id = "emojitron";

  emojitron.innerHTML = "<div class='uninitialised'></div>";

  emojitron.children[0].classList.add("input-wrap", "input-select");

  const divWrapper = emojitron.querySelector("div");

  divWrapper.classList.remove("uninitialised");

  const selectEl = await createEmojiSelect(emojitronValues);

  const label = createLabel(selectEl.id, labelText);

  divWrapper.append(selectEl);
  divWrapper.prepend(label);

  document.body.append(emojitron);
  setupEmojitronEvents(selectEl);
};

export const run = async () => setupEmojitron();

export default run;
