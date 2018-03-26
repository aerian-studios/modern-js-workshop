## Week 7: :cigarette: ceci n'est pas une pipe :toilet:

In this session we put into practice some of the funcitonal programming
principles from the previous session, and see how we can use them to write,
testable, reusable and flexible code.

Our aim was to build an emoji keyboard. We wanted to load our emojis, filter so
that we have just faces, extract the moji characters and create buttons. When
clicked, these buttons should append the character to the header text.

![play him off](https://media.giphy.com/media/UFGj6EYw5JhMQ/giphy.gif)

We started by creating and testing a function to append text to the title in the
header. This was a simple case of setting `h1.textContent += text`.

We created a function to create the keyboard, and started by creating a single
key by hand. Once this worked, we looked at how we could break each part of the
job of turning an emoji object into a separate step. It turned out that lots of
these were already available as functions that we created in previous weeks.

Step 1 was to filter the emojis so that we only had the face category. Last week
we'd created a function `makeExtractFunctionByCategory` which was a Higher Order
Function. When passed a category name, it returned a function that would accept
an array of emojis and return an array of only the objects that match that
category. Internally this worked by using `Array.filter`.

Step 2 was to extract the "moji" (character), which we also had a function for.
This uses `Array.map` to take each object and return its `moji` property.

At this point we had an array of face emoji characters. We needed to create
buttons for these, and then create an approriate click handler for each.

```javascript
export const makeButton = (moji) => {
    const button = document.createElement("button");
    button.textContent = moji;
    return button;
};
```

Creating the button is quite simple, using normal DOM methods. This function is
pure, and we could easily test it. It also doesn't do anything, as we need a
click handler. Our click handler is created with another higher order function,
which accepts the moji character and returns a handler to append that character
to the title, using our `appendToTitle` function from before.

```javascript
export const makeClickHandler = (character) => {
    return () => {
        appendToTitle(character);
        return false;
    };
};

export const makeButton = (moji) => {
    const button = document.createElement("button");
    button.textContent = moji;
    button.onclick = makeClickHandler(moji);
    return button;
};

export const makeButtons = (mojis) => mojis.map(makeButton);
```

We've written `makeClickHandler` out in longer syntax to make it clearer what is
happening. When passed a character, it is returning a new function that calls
`appendToTitle` with the character argument. The `makeClickHandler` function
isn't called each time the button is clicked: it is just once when the button is
created, but the retuened function remembers the value of the character that was
originally passed in. This concept is called **closure**, and is a vital concept
in JavaScript.

Now that we have our functions for each stage of the process, we need to pass
the emoji array through them. The result of each needs to be passed in to the
next one. There are a few ways we could do this. The most obvious would be to
assign the return value of each to a new variable, which we then pass to the
next function. This is probably the most common way of handling this. It is
however very verbose, and creates lots of unnecessary variables.

The other way would be to nest the calls inside each other. e.g.:

```javascript
const buttons = makeButtons(extractMojis(filterFaceCategory(emojis)));
```

This is compact, but hard to read. We could make it less clumsy and more
reusable by using the `compose` function that we learnt about last time. This is
equivalent to the previous version:

```javascript
const makeButtonsFromEmojis = compose(
    makeButtons,
    extractMojis,
    filterFaceCategory
);

const buttons = makeButtonsFromEmojis(emojis);
```

We can now reuse `makeButtonsFromEmojis` elsewhere if needed, without needing to
remember the individual parts. However there is another step that could make it
even easier to understand. The `compose` funciton accepts its argument in the
same order as they appear when nested, which makes it easier to migrate from one
to the other, but can be harder to get your head around. In this situation it's
easiest to think of the process as a production line, where each stage does
something to the emoji, then passes the result on to the next function. This is
analogous to the Unix `pipe` operator ("`|`"). There is a function called `pipe`
that is identical to compose except the arguments are in the reverse order,
which makes it easier to think of with this analogy. The input is passed to the
first function, then the result on to each and the finally returned. This is how
our example looks using `pipe`:

```javascript
const makeButtonsFromEmojis = pipe(
    filterFaceCategory, //[Object emoji], [Object emoji], ...
    extractMojis, // 😻, 😿, 😁, 😃, 😄, 😉, 😏, 😓, 😠, 😡
    makeButtons // [HTMLButtonElement], [HTMLButtonElement], ...
);

const buttons = makeButtonsFromEmojis(emojis);
```

This makes it easy to switch out any of the functions if we want to change the
process. For example, we could replace `filterFacesCategory` with a more
generalised version, such as a call to a higher-order function to generate a
filter. We can use `makeExtractFunctionByCategory` from last week.

```javascript
const category = "faces";

const makeButtonsFromEmojis = pipe(
    makeExtractFunctionByCategory(category),
    extractMojis,
    makeButtons
);

const buttons = makeButtonsFromEmojis(emojis);
```

We can then extract the function to set the keys, and we're ready to go.

```javascript
export const setKeys = (keys) => {
    const div = document.querySelector("form div");
    div.innerHTML = "";
    keys.forEach((key) => div.appendChild(key));
};
```
