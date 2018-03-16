## Week 1: 😻 Hello Kitty 😻!

This week we got our environments set up, and talked about testing, modules, functions and array methods.

### Modules and testing

We start our local server with `npm run serve` and load our demo in the browser at http://localhost:1337. We soon find our first error.
`week01.js` is missing! Create it, and find the next error: `run` could not be found. We create our function called `run` in `week01.js`, but it still can't be found until we export it.

```javascript
export function run() {}
```

If we take a look at `index.html` and `index.js` to see what was happening we can see a new type of script tag:

```html
<script type="module" src="index.js"></script>
```

This is the new ES module syntax, [which is now supported in most browsers](https://caniuse.com/#feat=es6-module). Take a look at `index.js` to see the syntax for `import`, and see where we are calling `run`.

```javascript
import { run as week01 } from "./week01.js";

week01();
```

Next we can start Test-Driven Development!

Run `npm test` and we can see that we have no tests yet, so create `week01.test.js`. Next we write a test for our first challenge.

```javascript
import { getEmoji } from "./week01.js";

it("returns an emoji when passed name", () => {
  expect(getEmoji("heart eyes cat")).toEqual("😻");
});
```

We can start by cheating and make our test pass by creating a `getEmoji()` function that returns "😻" every time. Luckily there's a big list of emojis in `lib/emojis.js` which we can use to find the real emoji. We can use the default export syntax to import it (no curly brackets).

```javascript
import emojis from "./lib/emoji.js";
```

### Arrays and Objects

We can use `console.log` to explore the big array of emojis. We looked at `for...in` and `for...of` loops. We looked at why we used `const` to declare the variable. We then created our first proper passing version of getEmoji, using `for...of`:

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
const isTheRightEmoji = function(emoji, name) {
  return emoji.code === name;
};
```

We talked about how a function that returns true or false is called a _predicate_, and then looked at how arrays in JavaScript have lots of useful methods for manipulating them, which are usually faster than rolling your own functions. We refactored `getEmoji` to use our `isTheRightEmoji` predicate. We discussed why we had to declare a function inside the `getEmoji` function (so that we have access to the `name` variable).

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
  const emoji = emojis.find(item => isTheRightEmoji(item, name));
  return emoji.moji;
}
```

### Resources

#### Functions

* http://javascript.info/function-basics
* http://javascript.info/function-expressions-arrows
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  #### Modules
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
* https://medium.com/dev-channel/es6-modules-in-chrome-canary-m60-ba588dfb8ab7
* https://nodejs.org/api/esm.html
  #### Array methods
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
* http://javascript.info/array-methods
  #### Testing
* https://facebook.github.io/jest/
