## Week 03: 💂 Standing guard 💂

This week is all about code quality and tooling. For this workshop we need to install [VS Code](https://code.visualstudio.com/), and we will look at some of the tools we can use to help improve our code.

### Coding standards

Coding standards help ensure everyone is familiar with the codebase and reduce barriers to entry for devs that are new to the project. They help prevent git conflicts from e.g. changing tabs/spaces, and reduce thinking time when looking at someone else's code.

The biggest downside is that it can be extra work, and it can feel like you're being nagged. To demonstrate this, we installed [the ESLint extension for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), by clicking the extensions tab in the sidebar and searching ESLint. Once installed, we can see that it complains about lots of things in our code. This can be annoying, but we can auto-fix lots of these problems. If we install [the Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) we can look at how code formatters can make it even easier, especially if they are set to format on save. Open VS Code preferences and set `"editor.formatOnSave": true` and see it magically reformat all of our code. We can manually fix the remaining warnings, which is a much less daunting task. The remaining issues are mostly things unrelated to formatting, such as not consistently returning from a function, or using `let` instead of `const`.

### Side-effects and pure functions

Side-effects are things outside our function that effect it or are effected by it. For example, calling an API is a side-effect, as is writing to the console. These can make it harder to test functions, as we could end up effectively testing someone else's code instead of our own. We don't want our tests to fail if the network goes down. We want our tests to have the same result every time we run them. For these reasons, it's best to keep the number of functions with side-effects to a minimum.

A function that always returns the same value when passed the same input, and doesn't change anything except via its return value is called a pure function. While it's best to make as many of our functions as possible as pure function, if our code is all pure then it won't do anything. So, while we need side-effects if we're to actually do anything, it's best to keep these isolated so we can keep an eye on them.

### Mocking

It can be hard to test functions that have side-effects, which is why we use mocks. A mock replaces a function that has side effects with a dummy one that is pure. For our example, in our project we can replace our `fetch` polyfill with a mock that returns a fixed JSON object. We put the mock into a directory called `__mocks__` next to our `node_modules` directory. We add `jest.mock("isomorphic-unfetch")`, which tells Jest to use our mock version instead of the real fetch polyfill.

### Exercise: the changing of the guard

We want to re-use our emoji functions from previous weeks, so rather than copying them or pulling them in from the previous weeks' files, we move them into a new `emojilib` library, which we move to the `lib` directory.

One common side-effect that we need to deal with is adding or changing content on an HTML page. Our exercise this week is to write a function that adds our emojis into the `<h1>` in the page. We want to write our test first, but as we're not running in a browser our first attempt will fail.

```html
<!-- index.html -->
<h1 id='heading'></h1>
```

```javascript
// week03.test.js
it("inserts our emoji into the header", async () => {
  const emojis = await allYourBase("guardsman");
  await insertEmoji(emojis);
  expect(document.body.innerHTML).toEqual("<h1 id='heading'>💂🏻💂🏼💂🏽💂🏾💂🏿💂</h1>");
});
// TypeError: cannot set property innerHTML of null
```

Luckily, Jest comes bundled with [jsdom](https://github.com/jsdom/jsdom), which emulates the DOM in JavaScript. A small change allows our code to work. We update the test and implement `insertEmoji`

```javascript
// emojilib.js

export const insertEmoji = emoji => {
  const h1 = document.getElementById("heading");
  h1.innerHTML = emoji;
};
```

We'll test this by checking the resulting HTML.

```javascript
// week03.test.js
it("inserts our emoji into the header", async () => {
  document.body.innerHTML = "<h1 id='heading'></h1>";
  const emojis = await allYourBase("guardsman");
  await insertEmoji(emojis);
  expect(document.body.innerHTML).toEqual("<h1 id='heading'>💂🏻💂🏼💂🏽💂🏾💂🏿💂</h1>");
});
// Expected value to equal: "<h1 id='heading'>💂🏻💂🏼💂🏽💂🏾💂🏿💂</h1>",
// Received "<h1 id=\"heading\">💂🏻💂🏼💂🏽💂🏾💂🏿💂</h1>"
```

But wait..this still breaks. jsdom has changed the HTML to use double quotes. We could change our test so that the HTML exactly matches, but there is an easier way. Rather than trying to work out exactly what the HTML will be generated will look like, we can introduce snapshot tests.

#### Snapshot tests

A snapshot test checks that an output value does not change. The first time the test is run, the output is saved as a `.snap` file, which we check into git. If future updates change this output then the test will fail.

```javascript
it("inserts our emoji into the header", async () => {
  document.body.innerHTML = "<h1 id='heading'></h1>";
  const emojis = await allYourBase("guardsman");
  insertEmoji(emojis);
  expect(document.body.innerHTML).toMatchSnapshot();
});
```

The syntax is very simple, and it handles all of the saving to disk automatically. We can see that a new `__snapshots__` directory is created with a new file `week03.test.js.snap`.

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`inserts our emoji into the header 1`] = `"<h1 id=\\"heading\\">💂🏻💂🏼💂🏽💂🏾💂🏿💂</h1>"`;
```

If we ever need to change the saved value, we can run `npx jest --updateSnapshot` to update the snapshot.

### Resources

* [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Mocks](https://facebook.github.io/jest/docs/en/manual-mocks.html)
* [What are pure functions?](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)
