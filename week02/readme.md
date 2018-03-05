## Week 02: 🐶 A Game of Fetch 🐶

![Stop trying to make fetch happen](https://media.giphy.com/media/5G98t8QjqBLK8/giphy.gif)

### Variables: `let` vs `const`

We use `let` if we want to change the value, and `const` if we won't. We can explore this by trying to increment the value of a `const` and see that it causes an error.
We create an empty array using the `[]` syntax and an empty object using `{}`, and see that even with `const`, we are able to change the contents of the array or object.

### Shorthand object syntax

The common case of creating an object and assigning keys using variables of the same name can be done in a shorthand way.

```javascript
const foo = 1;
const bar = 2;

const obj = { foo, bar }; // = {foo: 1, bar: 2}.
// Equivalent to {foo: foo, bar: bar}
```

### Destructuring and the rest operator

Destructuring assignment allows us to quickly extract values from an object or array into new variables.

```javascript
const obj = { foo: 1, bar: "hello", baz: 20 };

const { foo, bar } = obj;

console.log(foo); // 1
console.log(bar); // "hello"

const arr = [1, 3, 5, 7, 9];

const [first, second] = arr;

console.log(first); // 1
console.log(second); // 3
```

The rest operator (`...`) allows us to capture the rest of the properties of entries of an array or object when we have used destructing assignment:

```javascript
const obj = { foo: 1, bar: "hello", baz: 20 };

const { foo, ...restObj } = obj;

console.log(foo); // 1
console.log(restObj); // {bar: "hello", baz: 20}

const arr = [1, 3, 5, 7, 9];

const [first, second, ...restArr] = arr;

console.log(first); // 1
console.log(...restArr); // [5, 7, 9]
```

### Exercise: find the dog

Some people prefer dogs to heart-eyed cats, so we try to find the dog emoji. If we copy our tests from last week we can change the cat with heart eyes to the dog.

```javascript
it("returns a dog emoji when passed 'dog'", () => {
  expect(getEmoji("dog")).toEqual("🐶");
});
//  FAIL  ./week02.test.js
```

### fetch, async and await

Unfortunately our list of emojis does't include the dog, so we have to look for a better source. The Emojidex API fits the bill. We can extract our emoji fetching into a new function. The `fetch` API is an easy way to perform HTTP requests, and is supported by all modern browsers.

![they made fetch happen](https://i.imgur.com/bnPIoWu.png)

Unfortunately, fetch doesn't work in Node, but we can install a polyfill to fix this. A polyfill is a small library that fills in holes in API support. We import it into our test file [using a different syntax](https://www.typescriptlang.org/docs/handbook/modules.html#import-a-module-for-side-effects-only):

`import "polymorphic-unfetch";`

...because we only need its side-effects (it adds a `fetch` method to the global space).

Fetch has a nice simple syntax: `fetch("https://cdn.emojidex.com/static/utf_emoji.json")`
When we try this we'll find that instead of returning our data it returns a Promise. A Promise is like a receipt given to you when you pay for your coffee. You take it to the counter and collect your coffee when it's ready. In ~~the olden days~~ 2015, this meant you had to use quite a complicated syntax, but luckily we're in 2018 and can use `async` and `await`. If you put `async` before the function then you can just use await and write your code as if it was synchronous.

```javascript
export const fetchEmojis = async () => {
    const response = await fetch("https://cdn.emojidex.com/static/utf_emoji.json");
    const emojis = await response.json();
    ...
}
```

An async function returns a promise, but if you return a normal value it is magically wrapped in a promise for you. However there is no need to await a value if you're about to return it: it's fine to return the promise directly:

```javascript
export const fetchEmojis = async () => {
  const response = await fetch(
    "https://cdn.emojidex.com/static/utf_emoji.json"
  );
  return response.json();
};
```

We can then refactor our `getEmoji` function from last week to be async, and get our emojis using fetch:

```javascript
export async function getEmoji(name) {
  const emojis = await fetchEmojis();
  const emoji = emojis.find(item => isTheRightEmoji(item, name));
  if (emoji) {
    return getTheMoji(emoji);
  }
}
```

Our test function also needs to now be async, but this is a simple change:

```javascript
it("returns a dog emoji when passed 'dog'", async () => {
  expect(await getEmoji("dog")).toEqual("🐶");
});
```

### Exercise: Everybody rocks

For our next exercise we need to find several emojis and combine them into a single string. We start with the test:

```javascript
it("returns all of the emojis with the given base", async () => {
  expect(await allYourBase("sign_of_the_horns")).toEqual("🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻");
});
```

By looking at our emoji data, we can see that we need to find all emojis whose `base` property matches the one we were looking for. To do this, we introduce the array filter method. This is passed a predicate, like `find()` which we used last week, but instead of returning the first item it finds it returns an array of matching items.

```javascript
export const allYourBase = async base => {
  const emojis = await fetchEmojis();
  const filtered = emojis.filter(item => item.base === base);
  return filtered;
};
```

This found all of the emojis, but returned the whole objects, when we just want to emoji characters themselves. We can fix this with the Array.map method. Map is passed a function and returns a new array containing the result of calling the function on each item in the array. This allows us to extract the emoji character from the object.

```javascript
export const allYourBase = async base => {
  const emojis = await fetchEmojis();
  const filtered = emojis.filter(item => item.base === base).map(item => {
    return item.moji;
  });
  return filtered;
};
```

We then extracted that map function into a separate function, as this allows us to test it, and to easily change it if the API changes. We used the short array function syntax.

```javascript
export const getTheMoji = emoji => emoji.moji;

export const allYourBase = async base => {
  const emojis = await fetchEmojis();
  const filtered = emojis.filter(item => item.base === base).map(getTheMoji);
  return filtered;
};
// ["🤘","🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿", "🤘🏻"]
```

This successfully gave us an array of emoji characters. However we want it as a single string. For this we introduced the array `reduce` method, which reduces an array to a single value. The method is passed a function that accepts the previous and current value. It is optionally passed a starting value. We saw that if we left this off, the function is first called with the first two values, which works in some cases, but not if you want to change the type of the value. For this reason it's good practice to always specify a starting value. For us, we specified an empty string, as we'll be concatenating each value with the last one.

```javascript
export const getTheMoji = emoji => emoji.moji;

export const allYourBase = async base => {
  const emojis = await fetchEmojis();
  const filtered = emojis
    .filter(item => item.base === base)
    .map(getTheMoji)
    .reduce((previous, current) => {
      return previous + current;
    }, "");
  return filtered;
};

// 🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻
```

This passes the test! However we saw that this involves looping through the array twice. While this is fine here as the array is short, we can refactor this to be more efficient, by taking the transform out of map and putting it into reduce. Luckily, as we extracted it into a separate function, this is simple:

```javascript
export const allYourBase = async base => {
  const emojis = await fetchEmojis();

  return emojis
    .filter(item => item.base === base)
    .reduce((previous, current) => {
      return previous + getTheMoji(current);
    }, "");
};
// 🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻
```

A little refactor gives us this neater version:

```javascript
export const allYourBase = async base => {
  const emojis = await fetchEmojis();

  return emojis
    .filter(item => item.base === base)
    .reduce((previous, current) => previous + getTheMoji(current), "");
};
```

Ta-da!

### Resources

#### Variables

* http://javascript.info/variables

### Destructuring assignment and ...rest

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

### Polyfills

* http://javascript.info/polyfills

### Fetch

* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### Async/await

* https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
* http://javascript.info/async-await
* https://facebook.github.io/jest/docs/en/asynchronous.html#async-await

### map/filter/reduce

* https://hackernoon.com/map-filter-and-reduce-67d408e06107
