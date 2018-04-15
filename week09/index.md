# Week 09: ⚛️ React ⚛️

This week we are introducing something new and exciting: React. This is a
frontend library created by Facebook, which has become incredibly popular over
the past few years, both on the web and via React Native for creating native
mobile apps.

On the web, React works by taking over a DOM element on the page, and rendering
itself to it. We've already set up our environment with Webpack, so we can get
started by adding our React `<div>` in index.html, and importing the compiled JS
bundle.

```html
<head>
<!-- ... -->
  <script defer src="dist/bundle.js" type="text/javascript"></script>
</head>

<body>
  <div id="app"></div>
<!-- ... -->
</body>
```

We've added the `defer` attribute to the script to ensure it loads after the
HTML.

In our `index.js`, we're no longer loading a `run()` function as we did before:
we're just importing our initial `week09/index.tsx` file, which is our React
entry point.

```js
import "./week09/index.tsx";
```

You'll note that we're using the extension `tsx`, not `js`. This is because
we'll be working in TypeScript this week. This isn't required, but it gives us a
lot of useful tools later on. The `x` indicates that this is a React file, which
tells the compiler to allow syntax that would be illegal in regular TypeScript
or JavaScript.

Let's continue by creating our `index.tsx` file in this folder.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello world</h1>, document.getElementById("app"));
```

Let's walk through what's going on here. FIrst we need to import React and
ReactDOM. The ReactDOM method is the part that actually renders our app into the
web page. It's passed two paramters. The second is simply the DOM element we
created before. The first one is the odd one. We're not used to putting HTML
straight into a JavaScript or TypeScript file, because it would be a syntax
error. However in a JSX or TSX file it is allowed, and the compiler converts it
to function calls. The code we have there is compiled to this:

```ts
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
    React.createElement("h1", {}, "Hello world"),
    document.getElementById("app")
);
```

If we want to see our code we need to start the Webpack compiler and dev server.
We have scripts for these, so in separate terminals run `npm run webpack:dev`
and `npm run serve`. This will launch the browser and hopefully we should see
**Hello world** at the top. Congratulations: you've made your first React app!

That isn't very interesting though, as we're just rendering regular old HTML
tags. Things get interesting when we move on to custom components. Let's get
started. We're going to re-implement our emoji keyboard from last week as a
React component. We'll build four components: `EmojiKey`, which represents the
individual keys, `EmojiKeyboard` which contains all of the keys, `EmojiDisplay`
which shows the output, and `App`, which is the component which wraps
everything.

First, let's take our `<h1>` element and move it into a new `EmojiDisplay`
component. A React component can effectively be one of two things: a class with
a render method that returns some text or DOM elements or other React components
(a class component), or just a function (with no class) that does the same thing
(a functional component). It's a good idea to start by creating a functional
component if possible, and convert it to a class later if needed.

```tsx
import * as React from "react";

export const EmojiDisplay = (props) => {
    return <h1>{props.children}</h1>;
};
```

Let's break this down. We have an arrow function that accepts a `props` argument
and returns an `h1` element, similar to the one we used before. The curly
brackets are used to insert variables inside the h1. This syntax might be
familiar from templating libraries such as Mustache or Handlebars. We're
inserting the `children` property into the `h1` and returning it. Let's refactor
this into the shorthand arrow syntax.

```jsx
export const EmojiDisplay = (props) => <h1>{props.children}</h1>;
```

We can simplify this further, using destructing assignment for the props. We're
only interested in the `children` property, so we can change the syntax to this:

```jsx
export const EmojiDisplay = ({ children }) => <h1>{children}</h1>;
```

Pretty neat! However, if you're viewing this in an editor, you'll be getting a
nasty red line under the `children` argument. This is because this is
TypeScript, and we haven't told it what type of arguments to accept. Luckily,
React handles this for us. The type of component we have here is more properly
called a "stateless functional component". Because that's a bit wordy, React
gives us a shorthand: `SFC`. Let's tell TypeScript that this is what it is.

```jsx
import * as React from "react";

export const EmojiDisplay: React.SFC = ({ children }) => <h1>{children}</h1>;
```

Adding `React.SFC` after the variable name tells TypeScript that this is what it
is, so it knows that it will receive a an object with a `children` property.

Let's go back to our `index.tsx` and use our new component.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EmojiDisplay } from "./EmojiDisplay";

ReactDOM.render(
    <EmojiDisplay>Hello 👽</EmojiDisplay>,
    document.getElementById("app")
);
```

Reload your browser and you should see **Hello 👽**. The content of the tag is
passed to our function as the children property, and then our function returns
an h1 containing those children.

We're happy with our `EmojiDisplay` component, so let's add a snapshot test to
check that we don't break it in future. For this, we're introducing a new
library `react-test-renderer`. This allows us to render the component inside our
tests. Setting up the snapshot test is pretty simple.

```tsx
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";
import * as renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer
        .create(<EmojiDisplay>Hello everyone</EmojiDisplay>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
```

The renderer has a useful method to convert the element to JSON, which allows us
to easily test the snapshot. This is the snapshot that will be created by this
test:

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders correctly 1`] = `
<h1>
  Hello everyone
</h1>
`;
```

Now if we accidentally make a change that alters the output of EmojiDisplay then
our test will fail so we can check what's happened. This is unlikely to happen
with a component this simple, but in more complex ones then this can be a
lifesaver.

We're now able to display emojis, but we want to be able to enter them. For that
we need a keyboard component. We've reached the point where we should create a
container component to hold the keyboard and display. The convention is to call
this base component `App`, so let's go ahead and create App.tsx.

```tsx
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

export class App extends React.Component {
    render() {
        return (
            <div>
                <EmojiDisplay />
            </div>
        );
    }
}
```

This looks different! We're using the other syntax for creating components.
Previously we just created a function that returned elements. Here we're using a
class with a render method. These are commonly called "container components" or
"smart components". As I said before, the recommended practice is to create
functional components if possible, and only use class components if you need the
extra features that they provide. This will almost always be the case with the
top-level App component, and ours is no exception.

Right now this doesn't do anything that a functional component can't do, but
we're about to add a feature that's only available to classes: state. Functional
components are pure functions, meaning they always return the same output for a
given input. For our app this won't be the case: we'll have different text
displayed according to what has previously been entered with the keyboard. We'll
store this is the `state` property of the class.

```tsx
interface State {
    output: string;
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Hello aliens",
};


export class App extends React.Component<Props, State> {
    public state = DEFAULT_STATE;
    // ...
```

Whoa! What's going on here? Well, we're using a couple of TypeScript features to
define the type of our state and props. First we define interfaces for each of
them. We're calling them `State` and `Props`, but that's not required. We're
then passing those interfaces in the `React.Component` type declaration, inside
the angle brackets. These are optional, and if omitted the compiler will try to
infer the types. It's best to always explicity type them though, as it avoids
mistakes and acts as documentation for the component, making it easy to see what
types it's expecting. We're not expecting any props, so we're defining an empty
interface. Commonly we'll skip this part and just pass in `{}` directly, like
this:

```tsx
export class App extends React.Component<{}, State> {
```

We've defined it outside so it's clear that this argument is the Props, and to
make it clear that we're not expecting any apart from the default `children`
prop which is always available.

As well as defining the types, we're also setting-up an initial state for when
the component is first created. You can do this inline, but by defining it as a
separate constant we can reset it back to this state later if needed.

Let's update out component to make `EmojiDisplay` show the current output:

```tsx
interface State {
    output: string;
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Hello aliens",
};


export class App extends React.Component<Props, State> {
    public state = DEFAULT_STATE;

    render() {
        return (
            <div>
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
    // ...
```

Refresh your browser and you should see **Hello aliens**. We're now ready to
create the keyboard itself, but first let's create a single `EmojiKey`
component. We'll to the proper TDD thing and create the test first, so let's go
ahead and create `EmojiKey.tsx` and `EmojiKey.test.tsx`.

We'll leave out the snapshot test for now, as we only want a snapshot once we're
happy with the output of the component.

First, let's think what we want our key to do. We will pass it the `Emoji`
object that we want to display, and a callback function that it will use to add
the emoji to the display when the button is pressed. We'll start by creating
some mocks for these. We'll use `jest.fn()` to mock the callback function. This
creates a spy function that we can use to check that the callback is being
called properly.

```tsx
import * as React from "react";
import { EmojiKey } from "./EmojiKey";
import * as renderer from "react-test-renderer";

const emoji = {
    code: "ski",
    moji: "🎿",
};

const onAddEmoji = jest.fn();

it("calls the callback with the right moji when clicked", () => {
    const tree = renderer
        .create(<EmojiKey emoji={emoji} onAddEmoji={onAddEmoji} />)
        .toJSON();
    if (tree) {
        tree.props.onClick();
    }
    expect(onAddEmoji).toHaveBeenCalledWith(emoji.moji);
});
```

We're using the test renderer as before, but this time instead of just checking
the snapshot, we're simulating a click and checking that it's correctly calling
the onAddEmoji function with the moji character that we used.

Now we have a failing test, let's create the component. We can use a stateless
functional component again here, so let's get started. The props are a little
more complicated than before, so let's focus on them first. If you look at the
test we just created, we can see that `EmojiKey` is passed two props: the emoji
object, and a callback function. We can define both of these in the props.

```tsx
interface Props {
    emoji: Emoji;
    onAddEmoji: (moji: string) => void;
}
```

`Emoji` is referring to a type that we'll be creating in a minute. `onAddEmoji`
is a function type. This uses a simple syntax that looks like an arrow function.
First we show the arguments that the function will accept (in this case a single
string), and then after the arrow, the type that it will return. We're not
returning anything, so we'll mark it as `void`.

Now we need to define the Emoji type. This is the same type that we defined in
week 5, but we'll make a couple of changes. First, we'll break it out into a
separate file, so we can easily refer to it from elsewhere. Create `Emoji.ts`
like this:

```tsx
export interface Emoji {
    code: string;
    moji: string;
    [key: string]: any;
}
```

This should be familiar from before, except the last type. This simply says that
the Emoji object is allowed to have any other extra properties, as long as it
also has the `code` and `moji` properties too.

We'll import the interface back in our EmojiKey.tsx file, and then add the
component function itself.

```tsx
import * as React from "react";
import { Emoji } from "./Emoji";

interface Props {
    emoji: Emoji;
    onAddEmoji: (moji: string) => void;
}

export const EmojiKey: React.SFC<Props> = ({ emoji, onAddEmoji }) => (
    <button onClick={() => onAddEmoji(emoji.moji)}>{emoji.moji}</button>
);
```

We've passed in `<Props>` to `React.SFC` to define what types it should expect.
We're then using destructing to access the two properties that we're interested
in. Once again, we could just use `(args) => ( //...`, but this saves some
typing.

We're returning an HTML button, which contains the `emoji.moji` character, and
has an onClick property that calls the `onAddEmoji` function, passing in the
moji character.

We should have a passing test now. Let's go back to `App.tsx` and try it for
real. First change the render method to include our key, using a single emoji to
test:

```tsx
    render() {
        return (
            <div>
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKey emoji={{code: "ski", moji: "🎿"}} />
            </div>
        );
    }
```

The double curly brackets are because there's one set to show we're adding a
variable, and another set is the object that we're passing in.

Now we need to create the method that adds the character to the display. It does
this by updating the state.

```tsx
    public addEmoji = (moji: string) => {
        this.setState({ output: this.state.output + moji });
    };
```

This udpates the state, adding our emoji to the end of the current string. We
never update the state object directly, but use `setState` instead. If we don't,
React doesn't know to update the display. Let's pass this method to `EmojiKey`:

```tsx
    render() {
        return (
            <div>
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKey emoji={{code: "ski", moji: "🎿"}} onAddEmoji={this.addEmoji} />
            </div>
        );
    }
```

Reload the page and try to out. We should see **Hello aliens**, and a single key
with 🎿 on it. Press it a few times, and the display should update to **Hello
aliens🎿🎿🎿**. We can improve this, as we probably want to clear the display of
the placeholder text when we first start typing. We can do this by comparing it
to the initial state. Now you can see one of the reasons we defined it
separately:

```tsx
    public addEmoji = (moji: string) => {
        let output = moji;
        if (this.state.output !== DEFAULT_STATE.output) {
            output = this.state.output + moji;
        }
        this.setState({ output });
    };
```

Now try it again, and it should clear the display, displaying just the emojis.
As we're happy with the `EmojiKey` component we can add a snapshot test to
`EmojiKey.test.tsx`.

Now it's time to expand our keyboard to include more than one key. To do this,
let's create an `EmojiKeyboard` component. It can be another `React.SFC`, as it
doesn't maintain its own state.

```tsx
import * as React from "react";
import { EmojiKey } from "./EmojiKey";
import { Emoji } from "./Emoji";

interface Props {
    emojis: Emoji[];
    onAddEmoji: (moji: string) => void;
}
export const EmojiKeyboard: React.SFC<Props> = ({ emojis, onAddEmoji }) => (
    <div id="keyboard">
        {emojis.map((emoji) => (
            <EmojiKey key={emoji.code} emoji={emoji} onAddEmoji={onAddEmoji} />
        ))}
    </div>
);
```

Our props include the `onAddEmoji` function that we'll pass through to the
individual keys, and an array of emojis to use for the keys. Aside from that
it's quite simple: we use `Array.map` to create a key for each emoji. We add an
extra `key` property to the `EmojiKey`. React likes arrays of components to each
have a unique key prop, so that it can optimise their display when deciding
which need to be re-rendered. We can use the `emoji.code`, as these are unique.

Once we've done this we can add the keyboard to the `App` component. Remove the
demo `EmojiKey` component, and replace it with an `EmojiKeyboard`. We'll import
the emojis themselves from `../lib/emoji` and pass the list to the component.

```tsx
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";
import { EmojiKeyboard } from "./EmojiKeyboard";
import emojilist from "../lib/emoji";

interface State {
    output: string;
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Choose your emoji",
};
export class App extends React.Component<Props, State> {
    public state = DEFAULT_STATE;

    public addEmoji = (moji: string) => {
        let output = moji;
        if (this.state.output !== DEFAULT_STATE.output) {
            output = this.state.output + moji;
        }
        this.setState({ output });
    };

    render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKeyboard emojis={emojilist} onAddEmoji={this.addEmoji} />
            </div>
        );
    }
}
```

Reload the browser and you should have a fully-functional emoji keyboard:
congratulations on your first working React app! Next week we'll improve it
further, but for now I highly recommend reading these extra articles.

### Resources

*   http://2ality.com/2018/04/type-notation-typescript.html This post by the
    JavaScript legend Axel Rauschmayer is an approachable but comprehensive
    introduction to TypeScript's type system. If you're having trouble
    understanding all those colons and sqaure brackets, read it through and it
    should help.
*   Despite the slightly off-putting title, this serves as a great explaination
    of how JSX works, and how those custom tags are turned into function calls
    and rendered to the page.
    https://evilmartians.com/chronicles/optimizing-react-virtual-dom-explained
