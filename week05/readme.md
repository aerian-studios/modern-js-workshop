## Week 5: :rocket: The future is now :rocket:

This week we look at how we can use modern JS even in old environments, by using bundlers and transpilers.
We started by looking at how browser modules had a useful mechanism for supporting older browsers, by providing a "nomodule" fallback. We could point this at a bundled JS file that was in a format supported by old browsers.

First, we updated our `index.html` to point at the bundle (which doesn't exist yet)

```html
  <script type="module" src="index.js"></script>
  <script nomodule src="dist/bundle.js" type="text/javascript"></script>
```

Adding the `nomodule` attribute means that module-aware browsers ignore the bundle. Old browsers don't understand the attribute, but that's OK as they'll load it by default anyway.

This is great, but we still need to create the version for the old browsers to run. We could write this by hand, but that would be pretty laborious and error-prone. Luckily there are tools to help.

We installed Webpack, which is bundler. This is able to bundle up all of our module files and turn them into a single file that old browsers can load and understand. Webpack is easy to use, and we got it set up with [a small config file](../webpack.config.js). We then run `npx webpack-cli`, and it builds `dist/bundle.js` and we're ready to go.

![packages of the future](https://media.giphy.com/media/3o85xo8f9wVYcwzZcY/giphy.gif)

## Transpilers

While Webpack is great at turning modules into files old browsers can load, it's no good if the browser isn't able to understand the JS that it has loaded. We're using modern language features like async/await and arrow functions
which are syntax errors in old browsers. Polyfills won't help, as it can't load the scripts at all.

The tool that we can use to convert the shiny new JS into vintage code that we can use in old browsers and old version of Node is called a transpiler. The oldest and most widely-used JS transpiler is Babel. This has loads of features, and is particularly good if you have specific environments that you need to target.

However we're not using Babel here. Instead we're using the TypeScript compiler (`tsc`), which like Babel can transpile modern JS into legacy code. However it also has some special tricks up its sleeve that we'll look at later. Best of all, we already have it installed. Jest - our test framework - doesn't support ES Modules out of the box, so we've been using the TS-Jest plugin behind the scenes, which uses `tsc` to silently transpile our code into a version with legacy modules, but retaining the modern JS code inside those modules. Prettier, the code formatter from week 3, also uses `tsc` to parse our JS. We've been secretly using Microsoft's compiler since week 1!

![Bill Gates rocks](https://media.giphy.com/media/xT9DPONJ0aADRFIoKI/giphy.gif)

We've specified `tsc-loader` in our Webpack config To get our code into a state ready for Webpack, we need to make a couple of small changes to our [TypeScript config file](../tsconfig.json). TypeScript lets us choose which JS version to generate. Up until now we've been targeting "ESNext", which means the most bleeding-edge, hipster-approved version, as Jest was happy with this. To support old browsers we need to change this. We could choose ES3 if we really wanted to support ancient browsers, but even IE 8 supports ES5, so that's what we'll choose. We change the module type generated to "commonjs", which is the format supported by all Node versions.

```javascript
{
  //...
  /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "target": "ES5",

  /* Specify module code generation: 'none', commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "module":  "commonjs"
}
```

We ran this and looked at the generated code, and saw that it had converted async/await into a series of helper functions, while other features such as decontructing assignment and arrow functions were expanded into the old, verbose versions. However, it complains that it doesn't recognise `Promise` or `fetch`. This is because these are new features that weren't found in the old standard libraries. Unlike language constructs they are still valid JS code, it's just that the classes themselves aren't available. This means they are a perfect candidate to be polyfilled.

By adding entries to `lib`, we tell `tsc` which libraries it can rely on having available. Unlike Babel, TypeScript doesn't Polyfill these automatically, so we'll have to do this ourselves.

```javascript
{
  //...
    "lib": [
      "es2015",
      "dom"
    ]
}
```

We choose `ES2015`, because we're using Promises and this was the first version of JS where these are found in the standard library. Adding `dom` gives us things such as `window` and `fetch`.

## Auto Polyfills

While adding these to lib tells `tsc` that these are available, it's no good unless we actually make them available to old browsers. For this we are going to use Polyfill.io, which is service created by the Financial Times, that automatically delivers the exact polyfills needed for each browser. By default it delivers a standard set that are generally useful. We just need two things and one of those (fetch) isn't in the standard set, so we'll request those specifically.

```html
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,promise"></script>
```

It's not worth doing this if you're only using features from the standard set. Polyfill.io is so widely-used that if you're using the standard script, your users probably already have it cached.

The nice thing about Polyfill.io is that it only delivers the actual polyfills that your browser requires, and doesn't make modern browsers download large polyfills for features which they already support. This is also why we haven't included the polyfill in our bundled code, which is what Babel would do. To illustrate this, we opened [the standard polyfill](https://cdn.polyfill.io/v2/polyfill.js) in Safari, and used the develop menu to change our user agent. We could then observe how it delivers hardly anything to modern browsers, but increasingly large polyfills for older versions.

Once we've linked the polyfill and run the Webpack bundler we were able to see that we have a great setup that allows us to write modern JS and run it in new browsers, while still supporting old browsers.

## Transpiling for Node

It's even easier to transpile to target old versions of Node, as it can handle the modules itself. By targeting ES5 with CommonJS modules, we can just run `tsc` with no need for webpack. We've already included a fetch polyfill for node in the `node.js` entrypoint file, so we can just type `node dist/node.js` and it Just Works®.

## TypeScript

While we've been using `tsc` to transpile our modern JavaScript, that's not what it's mainly for. TypeScript is also a language, which is basically modern JavaScript with the addition of static types. Adding types lets us catch loads of errors in code, before even saving the file. A lot of errors which we picked up in tests in earlier weeks would have been caught right there in the editor as we typed if we were using TypeScript. The great thing is that all modern JS is also valid TypeScript, as types are entirely optional. To demonstrate this, we copied our week 1 files into a new week 5 folder, changed the file extensions to `.ts`, and aside from some warnings about missing types, it compiled fine. As we had `tsc` already setup, it works fine to mix TS and JS files.

We quickly demonstrated how we can very easily add types in a few places, and TypeScript can automatically infer types elsewhere.

```javascript
import emojis from "../lib/emoji.js";

const isTheRightEmoji = (emoji, name) => emoji.code === name;

export function getEmoji(name) {
    const emoji = emojis.find((item) => isTheRightEmoji(item, name));
    if (emoji) {
        return emoji.moji;
    }
    return false;
}

export default function run() {
    console.log(getEmoji("heart eyes cat"));
}
```

In this example, we add one interface to define an emoji, and then types in three places, and `tsc` can infer types for all of the rest of the return values and variables.

We will go into more depth about TypeScript in a later session, but this is to show that it's easy to get started.

```typescript
import emojis from "../lib/emoji.js";

interface Emoji {
    code: string;
    moji: string;
}

const isTheRightEmoji = (emoji: Emoji, name: string) => emoji.code === name;

export function getEmoji(name: string) {
    const emoji: Emoji | undefined = emojis.find((item) =>
        isTheRightEmoji(item, name)
    );
    if (emoji) {
        return emoji.moji;
    }
    return false;
}

export default function run() {
    console.log(getEmoji("heart eyes cat"));
}
```

### Resources

*   [Webpack](https://webpack.js.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Polyfill.io](https://polyfill.io/v2/docs/)
*   [ts-loader: TypeScript loader for Webpack](https://github.com/TypeStrong/ts-loader)
*   [TypeScript configuration file](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
*   [Babel](https://babeljs.io/)
*   [Migrating to TypeScript from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
