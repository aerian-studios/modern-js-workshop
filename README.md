# We 😻 JS!

Let's get started! 

* `git clone https://github.com/aerian-studios/modern-js-workshop.git`
* `cd modern-js-workshop`
* `npm install`
* ...
* Profit!


To start the test runner, run `npm test`. To run the script with node, run `npm start`. To start the local web server, run `npm run serve` and open http://localhost:1337. 

## Week 1: 😻 Hello Kitty 😻!

This week we got our environments set up, and talked about testing, modules, functions and array methods.

### Modules and testing
We started our local server with `npm run serve` and loaded our demo in the browser. We soon found our first error.
`week01.js` is missing! We created it, and found our next error: `run` could not be found. We created our function called `run` in `week01.js`, but it still wasn't found until we exported it.

```javascript
export function run() {

}
```

We then took a look at `index.html` and `index.js` to see what was happening. We discovered a new type of script tag:
```html
<script type="module" src="index.js"></script>
```
This is the new ES module syntax, [which is now supported in most browsers](https://caniuse.com/#feat=es6-module). We took a look at `index.js` tosee the syntax for `import`, and saw where we were calling `run`.

```javascript

import { run as week01 } from "./week01.js";

week01();
```

Jumping back to `index.js`, we played with `console.log`, and tried logging a string. We saw that we could run the same code from the command line using node, by running `npm start`. We then started with Test-Driven Development. We ran `npm test` and saw that we had no tests yet, so we created `week01.test.js`. We talked about Matt's love of emojis, looked at the syntax for the Jest `it` function, and wrote a test for our first challenge:

```javascript

import { getEmoji } from "./week01.js";

it("returns an emoji when passed name", () => {
    expect(getEmoji("heart eyes cat")).toEqual("😻");
});

```

We cheated and made our test pass by creating a `getEmoji()` function that returns "😻" every time. We then found that Matt had helpfully provided everyone with a big list of emojis in `lib/emojis.js`. We looked at the default export syntax and the different way we import it (no curly brackets).

```javascript
import emojis from "./lib/emoji.js";
```

### Arrays and Objects
We used `console.log` to explore the big array of emojis. We looked at `for...on` and `for...of` loops. We looked at why we used `const` to declare the variable. We then created our first proper passing version of getEmoji, using `for...of`:

```javascript
export function getEmoji(name) {
    for (const emoji of emojis) {
        if (emoji.code === name) {
            return emoji.moji;
        }
    }
}

```

### Array methods and arrow functions
We talked out how we could refactor our function. We discussed why moving the "HOW" into a separate function can make it more re-usable, testable, readable and modular. We created `isTheRightEmoji` and saw it still worked, and then refactored it to be an anonymous function.

```javascript
const isTheRightEmoji = function (emoji, name) {
    return emoji.code === name;
}
```

We talked about how a function that returns true or false is called a *predicate*, and then looked at how arrays in JavaScript have lots of useful methods for manipulating them, which are usually faster than rolling your own functions. We refactored `getEmoji` to use our `isTheRightEmoji` predicate. We discussed why we had to declare a function inside the `getEmoji` function (so that we have access to the `name` variable). 

```javascript

export function getEmoji(name) {
    const emoji = emojis.find(function (item) {
        return isTheRightEmoji(item, name));
    });
    return emoji.moji;
}

```

We then looked at arrow functions, and the shorthand syntax for these, and saw how it could make more readable code, even though the syntax looks a bit 👽 at first.

```javascript

export function getEmoji(name) {
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    return emoji.moji;
}

```

### Resources
#### Functions
- http://javascript.info/function-basics
- http://javascript.info/function-expressions-arrows
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
#### Modules
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
- https://medium.com/dev-channel/es6-modules-in-chrome-canary-m60-ba588dfb8ab7
- https://nodejs.org/api/esm.html
#### Array methods
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- http://javascript.info/array-methods
#### Testing
- https://facebook.github.io/jest/

## Next week: the case of the missing 🐕