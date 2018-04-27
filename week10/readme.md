# Week 10: ⚛️ Further adventures in React ⚛️

We continue this week with our React project from our last session. We begin
with a review of React components.

There are two types of component that we deal with, but at their core they are
both just **a function that returns some JSX**. Class components do this via an
object with a `render()` method, while functional components are just the
function.

We can mix and match the components that we return, and with ReactDOM they can
be DOM elements or custom components. The rule is that the function must either
return a single wrapper component (which can have as many child components as
they'd like), or the components must be wrapped in JSX fragment identifiers
(which are just empty tags):

```jsx
//Valid
export const MyComponent = () => (
    <div>
        <h1>Hello</h1>
        <p>World</p>
    </div>
);
//Valid:
export const MyComponent = () => (
    <>
        <h1>Hello</h1>
        <p>World</p>
    </>
);

//Invalid:
export const MyComponent = () => (
    <h1>Hello</h1>
    <p>World</p>
);
```

As mentioned in previous weeks, it's worth getting into the habit of starting
your React components out as this type of (stateless) functional component and
only switching to the class syntax if you have a good reason... and really there
are only two good reasons - if your component needs a local _state_, or if you
need to hook into one of the lifecycle methods in React.

## What is State?

Where _Props_ are properties (variables, functions, attributes etc) passed into
a component from somewhere higher up in the tree - one of the wrapping
components - _State_, on the other hand is local variables that don't affect
anything higher up the tree. State could be limited to a single component, for
example a `<CountSeconds />` component might have a local State of how many
seconds it is showing:

```javascript
const DEFAULT_STATE = {
    seconds: 0,
};
export class CountSeconds {
    increincrementSecondsment = () => {
        this.setState({ seconds: this.state.seconds + 1 });
    };

    // Lifecycle method that is called once the component is rendered to the DOM
    componentDidMount() {
        window.setTimeout(this.incrementSeconds, 1000);
    }

    // Lifecycle method that is called by default if State or Props change
    render() {
        <time>{this.state.seconds}</time>;
    }
}
```

As you can see, most often those two reasons will go hand in hand.

State can be passed _down_ the component tree (and become the _Props_ of lower
components), but it should always be set and controlled in the original
component only. This pattern allows us to more easily understand when and why
out components change and also leads to a common pattern of a "root", stateful
class component wrapping/composing many stateless functional components. As in
our `<App />` class component from last week (NOTE: this example uses
typescript):

```javascript
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

import emojilist from "../lib/emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";

interface State {
    output: string;
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Hello aliens",
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

    private render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKeyboard emojis={emojilist} onAddEmoji={this.addEmoji} />
            </div>
        );
    }
}
```

Let's look at that a little more closely. Our `<App />` has _State_ with a
single, `output` property. The `<EmojiDisplay />` component takes this as a
_Prop_, as it's _children_ (i.e. contents). The only way that the State is
modified is through the `addEmoji` function, but you can see that the class
itself never uses it. Instead it passes the means to change its _State_ to the
`EmojiKeyboard` along with a list of emojis. If `EmojiKeyboard` or one of its
children (we don't really need to know) uses that function, it will change the
_State_ in `App`, which will then cause React to call the `render` lifecycle
method on `App` (because _State_ has changed) and on `EmojiDisplay` (because
_Props_ have changed).

## This week

This week we'll be using _State_, _Props_ and lifecyle methods to:

1.  Load the full emoji list from the API
2.  Add a button to clear the display
3.  Make a category filter for our `EmojiKeyboard`

As we are focussing on getting used to React this week, we're cutting out
demonstrations of how to test your components, but if you are interested, the
tests are in the repo.

### Task 1 - load full emoji list

Currently we are using our local list of emojis, which provides a fast load
experience for our users, but maybe they'd like to be more expressive than that
:shrug: so we'll need to get the full list once the component is already
rendered (we don't want to interfere with our nice, fast load).

As soon as we need to change something and cause the app to show the new
value(s), we know that we need to use _State_ or _Props_.

```javascript
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

import emojilist from "../lib/emoji";
import { fetchEmojis } from "../lib/emojilib";
import { Emoji } from "./Emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";

interface State {
    output: string;
    // Add emojiList to our State type
    emojilist: Emoji[];
}

interface Props {}

const DEFAULT_STATE: State = {
    output: "Type your emoji",
    // And add it to our (default) State definition
    emojilist,
};

export class App extends React.Component<Props, State> {
    // NOTE: 'readonly' indicator to explicitly state the state can't be modified elsewhere
    public readonly state = DEFAULT_STATE;

    // Lifecycle method that is called once the component is 'mounted' or rendered
    public componentDidMount() {
        this.loadRemoteEmojis();
    }

    public loadRemoteEmojis = async () => {
        const emojis = await fetchEmojis();
        // Once we have our emojis, setState and React does the rest
        this.setState(
            { emojilist: emojis }
        );
    };

    public addEmoji = (moji: string) => {
        let output = moji;
        if (this.state.output !== DEFAULT_STATE.output) {
            output = this.state.output + moji;
        }
        this.setState({ output });
    };

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <EmojiKeyboard
                    // Use the state to pass the emojis so that this will update when the state changes
                    emojis={this.state.emojiList}
                    onAddEmoji={this.addEmoji}
                />
            </div>
        );
    }
}
```

We add the emojis as an `emojiList` property in the local State and update the
`EmojiKeyboard` to use the State so that it will display with the default emojis
and updates when the local State changes.

To load the remote emojis only once the component is ready, we use the
`ComponentDidMount` lifecycle method. We are re-using our functions from
previous weeks and in this case `fetchEmojis` is an `async` function, which
means that we need to `await` it. We can't adjust the built in lifecycle methods
by making them asynchronous, but that is okay because we just make a new `async`
function called `loadRemoteEmojis` and `await` the fetch resolution before we
`setState`. React handles all the work of updating the display of all components
that use the changed State when the State changes.
