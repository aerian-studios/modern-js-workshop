import { getEmoji } from './lib/emojilib.js';

export const defaultMessage = "I don't know what I like, help me choose";
export const emojitronValues = ['sign of the horns', 'guardsman', 'joy', 'raised hand with part between middle and ring fingers'];

// Step 1
export const setDefaultHeading = (message) => {
    if (!document.getElementById('heading')) document.body.innerHTML = "<h1 id='heading'></h1>";

    const h1 = document.getElementById('heading');

    h1.textContent = message;
};

// Step 2 & 3
// export const setUpEmojitron = () => {
//     const emojitron = document.createElement('form')
    
//     emojitron.id = 'emojitron';
//     emojitron.setAttribute('action', '#');

//     emojitron.innerHTML = `<div class="input-wrap input-select"></div>`;
    
//     document.body.appendChild(emojitron);
// }

const createEmojiOptionElements = async (emojis) => {
    
    const emojiDex = await Promise.all(emojis.map(async (emoji) => {
       const theEmoji = await getEmoji(emoji);
       return theEmoji;
    }));
  
    const emojiKV =  emojiDex.reduce((prev, current) => `${ prev }
        <option value="${current}">${ current }</option>`, 
        `<option>Select an emoji</option>`);

    return emojiKV
};

export const createEmojiSelectEl = async () => {
    const select = document.createElement('select');

    select.innerHTML = await createEmojiOptionElements(emojitronValues);

    return select;
}


// Step 4
export const setUpEmojitron = async () => {
    const emojitron = document.createElement('form')
    
    emojitron.id = 'emojitron';
    emojitron.setAttribute('action', '#');
    emojitron.innerHTML = `<div class="input-wrap input-select"></div>`;

    // select contents
    const divWrapper = emojitron.querySelector('.input-select');
    const select = await createEmojiSelectEl();

    divWrapper.append(select);
    
    return document.body.append(emojitron);
}

export default function run() {
    setDefaultHeading(defaultMessage);
    setUpEmojitron();
}