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
We used `console.log` to explore the big array of emojis. We looked at `for...in` and `for...of` loops. We looked at why we used `const` to declare the variable. We then created our first proper passing version of getEmoji, using `for...of`:

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

## Week 02: 🐶 A Game of Fetch 🐶

![Stop trying to make fetch happen](https://media.giphy.com/media/5G98t8QjqBLK8/giphy.gif)

### Variables: `let` vs `const`
After reviewing last week, we started by looking at the difference between `let` and `const`. We use `let` if we want to change the value, and `const` if we won't. We explored this by trying to increment the value of a `const` and saw that it caused an error. 
We created an empty array using the `[]` syntax and an empty object using `{}`, and saw that even with `const`, we were able to change the contents of the array or object.

### Shorthand object syntax
We saw that the common case of creating an object and assigning keys using variables of the same name can be done in a shorthand way. 

```javascript

const foo = 1;
const bar = 2;

const obj = {foo, bar} // = {foo: 1, bar: 2}.
// Equivalent to {foo: foo, bar: bar}

```

### Destructuring and the rest operator
Destructuring assignment allows us to quickly extract values from an object or array into new variables.

```javascript
const obj = { foo: 1, bar: "hello", baz: 20};

const { foo, bar } = obj;

console.log(foo); // 1
console.log(bar); // "hello"

const arr = [1, 3, 5, 7, 9];

const [ first, second ] = arr;

console.log(first); // 1
console.log(second); // 3
```
The rest operator (`...`) allows us to capture the rest of the properties of entries of an array or object when we have used destructing assignment:

```javascript
const obj = { foo: 1, bar: "hello", baz: 20};

const { foo, ...restObj } = obj;

console.log(foo); // 1
console.log(restObj); // {bar: "hello", baz: 20}

const arr = [1, 3, 5, 7, 9];

const [ first, second, ...restArr ] = arr;

console.log(first); // 1
console.log(...restArr); // [5, 7, 9]
```

### Exercise: find the dog
Sadly Ben wasn't with us, but we knew he wanted to find the dog emoji, so we copied our tests from last week and changed the cat with heart eyes to the dog. 
```javascript
it("returns a dog emoji when passed 'dog'", () => {
    expect(getEmoji("dog")).toEqual("🐶");
}); 
//  FAIL  ./week02.test.js
```
### fetch, async and await

Unfortunately our list of emojis didn't include the dog, so we had to look for a better source. The Emojidex API fit the bill. We decided to extract your emoji fetching into a new function. We introduced the `fetch` API, which is an easy way to perform HTTP requests, and is supported by all modern browsers. 

![they made fetch happen](https://i.imgur.com/bnPIoWu.png)

Unfortunately, fetch doesn't work in Node, so we installed a Polyfill: a small library that fills in holes in API support. We import it into our test file [using a different syntax](https://www.typescriptlang.org/docs/handbook/modules.html#import-a-module-for-side-effects-only):

`import "polymorphic-unfetch";` 

...because we only need its side-effects (it adds a `fetch` method to the global space).

Fetch has a nice simple syntax: `fetch("https://cdn.emojidex.com/static/utf_emoji.json")`
We tried this, and found that instead of returning our data it returned a Promise. We talked about how a Promise was like a receipt given to you when you pay for your coffee. You take it to the counter and collect your coffee when it's ready. In  ~~the olden days~~ 2015, this meant you had to use quite a complicated syntax, but luckily we're in 2018 and can use `async` and `await`. We talked about how if you put `async` before the function then you can just use await and write your code as if it was synchronous.

```javascript 
export const fetchEmojis = async () => {
    const response = await fetch("https://cdn.emojidex.com/static/utf_emoji.json");
    const emojis = await response.json();
    ...
}
```

We talked about how an async function returns a promise, but if you return a normal value it is magically wrapped in a promise for you. However there is no need to await a value if you're about to return it: it's fine to return the promise directly:

```javascript 
export const fetchEmojis = async () => {
    const response = await fetch("https://cdn.emojidex.com/static/utf_emoji.json");
    return response.json();
}
```

We then refactored our `getEmoji` function from last week to be async, and get our emojis using fetch:

```javascript
export async function getEmoji(name) {
    const emojis = await fetchEmojis();
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    if (emoji) {
        return getTheMoji(emoji);
    }
}
```

We then saw that our test function also needed to now be async, but this was a simple change:

```javascript
it("returns a dog emoji when passed 'dog'", async () => {
    expect(await getEmoji("dog")).toEqual("🐶");
}); 
```

### Exercise: Everybody rocks
For our next exercise we needed to find several emojis and combine them into a single string. We started with the test:

```javascript
it("returns all of the emojis with the given base", async () => {
    expect(await allYourBase("sign_of_the_horns")).toEqual("🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻");
});
```

By looking at our emoji data, we saw that we would need to find all emojis whose `base` property matched the one we were looking for. To do this, we introduce the array filter method. This is passed a predicate, like `find()` which we used last week, but instead of returning the first item it finds, it returns an array of all found items.

```javascript
export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();
    const filtered = emojis.filter(( item ) => item.base === base);
    return filtered;
}
```

This found all of the emojis, but returned the whole objects, when we just want to emoji characters themselves. For this we introduced the array map function. Map is passed a function and returns a new array containing the result of calling the function on each item in the array. This allows us to extract the emoji character from the object.

```javascript
export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();
    const filtered = emojis.filter(( item ) => item.base === base)
                           .map(( item ) => {
                               return item.moji;
                           });
    return filtered;
}
```
We then extracted that map function into a separate function, as this allows us to test it, and to easily change it if the API changes. We used the short array function syntax.
```javascript
export const getTheMoji = (emoji) => emoji.moji;

export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();
    const filtered = emojis.filter(( item ) => item.base === base)
                           .map(getTheMoji);
    return filtered;
}
// ["🤘","🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿", "🤘🏻"]
```
This successfully gave us an array of emoji characters. However we want it as a single string. For this we introduced the array `reduce` method, which reduces an array to a single value. The method is passed a function that accepts the previous and current value. It is optionally passed a starting value. We saw that if we left this off, the function is first called with the first two values, which works in some cases, but not if you want to change the type of the value. For this reason it's good practice to always specify a starting value. For us, we specified an empty string, as we'll be concatenating each value with the last one.

```javascript
export const getTheMoji = (emoji) => emoji.moji;

export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();
    const filtered = emojis.filter(( item ) => item.base === base)
                           .map(getTheMoji)
                           .reduce((previous, current) => {
                               return previous + current;
                           }, "");
    return filtered;
}

// 🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻

```
This passes the test! However we saw that this involves looping through the array twice. While this is fine here as the array is short, we can refactor this to be more efficient, by taking the transform out of map and putting it into reduce. Luckily, as we extracted it into a separate function, this is simple:

```javascript
export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();

    return emojis.filter(( item ) => item.base === base)
                           .reduce((previous, current) => {
                                return previous + getTheMoji(current);
                           }, "");

}
// 🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻
```

A little refactor gives us this neater version:

```javascript
export const allYourBase = async (base) => {
    const emojis = await fetchEmojis();

    return emojis.filter(( item ) => item.base === base)
                 .reduce((previous, current) =>  previous + getTheMoji(current), "");

}
```

Ta-da!

### Resources
#### Variables
- http://javascript.info/variables

### Destructuring assignment and ...rest
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

### Polyfills
- http://javascript.info/polyfills

### Fetch
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### Async/await
- https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
- http://javascript.info/async-await
- https://facebook.github.io/jest/docs/en/asynchronous.html#async-await

### map/filter/reduce
- https://hackernoon.com/map-filter-and-reduce-67d408e06107