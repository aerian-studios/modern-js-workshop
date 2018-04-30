# Working with the ideas of React

This week we used 5 tasks designed to help us reason about the best ways of
working with React. Specifically, we are interested in the way that State and
Props are used and cause the Components that use them to render.

## Task 1 - Add a delete button

*   The delete button should remove a character from the end of the EmojiDisplay
*   When there are no characters left, it should return to the default value.

We started with this task because, from a React pattern point of view, it seemed
the easiest to reason about. We discussed approaches and it becames clear that
everyone was clear that all they needed to do was modify the `state.output` with
a delete button, but there was some confusion about the best place to put the
delete button. For simplicity's sake we decided to put the button in `App.js`
because that is where we would be actually modifying the State. That
notwithstanding, we saw that we could equally make separate components and pass
an `onDelete` function as a Prop. We began implementing thisapproach and soon
discovered that there was an unexpected complexity when trying to select a
single emoji from the `state.output` string because emojis are multi-part
characters with variable numbers of parts. We decided that the easiest way to
overcome this issue was to switch `state.output` to an array and use React's
inbuild rendering of arrays as children for the `EmojiDisplay`.

```javascript
// App.tsx
interface State {
    // switch to array of strings
    output: string[];
    emojilist: Emoji[];
    categories: string[];
    filteredEmojis: Emoji[];
    selectedCategory: string;
}

interface Props {}

const DEFAULT_CATEGORIES = getCategories(emojilist);
const DEFAULT_CATEGORY = DEFAULT_CATEGORIES[1];

const DEFAULT_STATE: State = {
    // placed in an array
    output: ["Type your emoji"],
    categories: DEFAULT_CATEGORIES,
    selectedCategory: DEFAULT_CATEGORY,
    filteredEmojis: emojilist.filter(makeAFilterByCategory(DEFAULT_CATEGORY)),
    emojilist,
};

export class App extends React.Component<Props, State> {
    public readonly state = DEFAULT_STATE;

    public componentDidMount() {
        this.loadRemoteEmojis();
    }

    public loadRemoteEmojis = async () => {
        const emojis = await fetchEmojis();
        this.setState(
            { emojilist: emojis, categories: getCategories(emojis) },
            () => this.updateCategory(this.state.categories[0])
        );
    };

    public clear = () => this.setState({ output: DEFAULT_STATE.output });

    // See more about this below
    public addEmoji = (moji: string) => {
        let output = [moji];
        if (this.state.output !== DEFAULT_STATE.output) {
            output = [...this.state.output, moji];
        }
        this.setState({ output });
    };

    // new function, see more below
    public removeEndEmoji = () => {
        if (this.state.output.length > 1) {
            return this.setState({
                output: this.state.output.splice(
                    0,
                    this.state.output.length - 1
                ),
            });
        }
        return this.setState({ output: DEFAULT_STATE.output });
    };

    public updateCategory = (selectedCategory: string) => {
        this.setState({
            selectedCategory,
            filteredEmojis: this.state.emojilist.filter(
                makeAFilterByCategory(selectedCategory)
            ),
        });
    };

    public onCategoryChange = (event: React.FormEvent<HTMLSelectElement>) =>
        this.updateCategory(event.currentTarget.value);

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                />
                <button onClick={this.clear}>Clear</button>
                // Simple button with an onClick method
                <button onClick={this.removeEndEmoji}>Del</button>
                <EmojiKeyboard
                    emojis={this.state.filteredEmojis}
                    onAddEmoji={this.addEmoji}
                />
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
}
```

We converted the `state.output` into an array and added a button to the `render`
method, which calls `Array.splice` on the current state and replaces the current
`state.output` without the last element. Using `splice` and also making a new
array in the `onAddEmoji` method are key because we don't want to mutate the
original array, rather we want to replace it and call `setState` with a new
array as per the functional programming idea of having no side effects.

We used a combination of array `destructuring` and `rest` parameters to make a
new array made up of the old state and add our new moji:
`output = [...this.state.output, moji];`, which can take some cognitive load
initially, but it does make a very convenient syntax!

## Task 2 - Disable an emoji button once it is used once

*   Consider how to do this without changing the type of component you use.
*   Re-enable the buttons if they are cleared from the EmojiDisplay

The first instinct in our discussion was to add some State to the buttons that
set them to _disabled_ if they were pressed, but upon consideration of the
second requirement, we could see that that was actually a very limited approach.
We talked about our existing state and realised that the record of used buttons
existed in the `state.output`. So we discussed how we'd use that and we came to
the conclusion that we could use it in the `EmojiKeyboard` when we output the
`EmojiKey`, we could check if it was included and pass a `disabled` property if
it was. We soon discovered one other consideration; emojis are multi-part
characters and we were having trouble with the string manipulation/regExp to
select one emoji. Consequently we chose to convert `state.output` to an array
instead of a string and make use of React's ability to accept arrays of
children.

```javascript
// App.tsx

// ... code
export class App extends React.Component<Props, State> {
    // ...code

    public render() {
        return (
            <div className="typewriter">
                // We can just pass the output array directly in because React accepts arrays as children
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                    value={this.state.selectedCategory}
                />
                <button onClick={this.clear}>Clear</button>
                <EmojiKeyboard
                    emojis={this.state.filteredEmojis}
                    onAddEmoji={this.addEmoji}
                    // New Prop here, so that EmojiKeyboard can output EmojiKeys accordingly
                    clickedKeys={this.state.output}
                />
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
}

// EmojiKeyboard
import * as React from "react";
import { Emoji } from "./Emoji";
import { EmojiKey } from "./EmojiKey";

interface Props {
    emojis: Emoji[];
    onAddEmoji: (moji: string) => void;
    // new
    clickedKeys: string[];
}
export const EmojiKeyboard: React.SFC<Props> = ({
    emojis,
    onAddEmoji,
    clickedKeys,
}) => (
    <div id="keyboard">
        {emojis.map((emoji: Emoji) => (
            <EmojiKey
                key={emoji.code}
                emoji={emoji}
                onAddEmoji={onAddEmoji}
                // Use the Props.clickedKeys to decide to disable the key
                disabled={clickedKeys.includes(emoji.moji)}
            />
        ))}
    </div>
);
```

We pass the `state.output` as a `clickedKeys` Prop to `EmojiKeyboard` and then
use the new `Array.includes` method to check if the key moji is within it and
set `disabled` accordingly. By doing so, we don't create new State and we don't
have to change our Components so that they also have State. This could be bad
for performance if there are many keys and many mojis to check, but is suitable
for our purposes. It gives us the re-enabling behaviour on delete and clear for
free because we are usign the same State. In a more realistic application we
might consider using Context or some abstraction of State (Redux et al) to make
this a little more performant.

## Task 3 - Disable an emoji button once it has been used 3 times

*   As above, consider how to manage the State

Once again, in discussion there was an instinct to try to somehow record how
many times a button is clicked, which would entail big changes to either
components or State, but having essentially discussed this already, we could see
that we already had the State that had all these answers. We just needed to
alter the function in `EmojiKeyboard`.

```javascript
<EmojiKey
    key={emoji.code}
    emoji={emoji}
    onAddEmoji={onAddEmoji}
    disabled={clickedKeys.filter((moji) => moji === emoji.moji).length >= 3}
/>
```

Above, we just filter our `Props.clickedKeys` by the key's moji to find how long
the array is. It is worth noting that if the number of keys, or the number of
mojis in the `Props.clickedKeys` is great, this may not be the most performant
option... but it is fine for our purposes!

## Task 4 - Set the currently selected value of the categories with State

By the time we came to this task we were all considering things from State
outwards. We figured out that we could just add a single line that set the
`value` of the `CategorySelector` based on `state.selectedCategory`. We are
passing arbitrary Props into our `select` element with a rest/spread (`...`)
operator in `CategorySelector`, so it just works... We also added a button to
test it working.

```javascript
export class App extends React.Component<Props, State> {
    public updateCategory = (selectedCategory: string) => {
       // ... code
    };

    // Arbitrarily change the selected category of the state
    public changeCategory = () => this.updateCategory(this.state.categories[3]);

    public onCategoryChange = (event: React.FormEvent<HTMLSelectElement>) =>
        this.updateCategory(event.currentTarget.value);

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                    // base the value on the state.selectedCategory, React does the rest
                    value={this.state.selectedCategory}
                />
                // ... code
                // Arbitrarily change category
                <button onClick={this.changeCategory}>Change it</button>
                // ... code
            </div>
        );
    }
}
```

## Task 5 - User selected emoji list

*   Create a button that loads the remote emojiList if it isn't loaded
*   If it is loaded, use the button as a toggle for the remote list or the local
    list

We discussed keeping a toggled State as the means of switching the list, but
then we realised that this could leave us with State out of sync if a developer
unexpectedly decided to alter the toggle without other appropriate changes, so
we decided to base the toggled state on the actual State that is responsible for
the display. We realised that we'd need to store the remote emojilist somewhere
and there was some consideration of putting it in State. I'm not certain that it
needs to be there, so I have put it in a variable within scope, but not related
to the Component itself.

Because our actual keyboard display is filtered, it didn't make sense to base
the toggle on that, so I created a `currentEmojilist` that acts as the piece of
State that is operated upon for display and tested against for toggling. This
gives us free keyboard updates as we toggle.

```javascript
import * as React from "react";
import { EmojiDisplay } from "./EmojiDisplay";

import emojilist from "../lib/emoji";
import {
    fetchEmojis,
    getCategories,
    makeAFilterByCategory,
} from "../lib/emojilib";
import { CategorySelector } from "./CategorySelector";
import { Emoji } from "./Emoji";
import { EmojiKeyboard } from "./EmojiKeyboard";
interface State {
    output: string[];
    currentEmojilist: Emoji[];
    categories: string[];
    filteredEmojis: Emoji[];
    selectedCategory: string;
}

interface Props {}

const DEFAULT_CATEGORIES = getCategories(emojilist);
const DEFAULT_CATEGORY = DEFAULT_CATEGORIES[0];

let remoteEmojilist: Emoji[] = [];

const DEFAULT_STATE: State = {
    output: ["Type your emoji"],
    categories: DEFAULT_CATEGORIES,
    selectedCategory: DEFAULT_CATEGORY,
    filteredEmojis: emojilist.filter(makeAFilterByCategory(DEFAULT_CATEGORY)),
    currentEmojiList: emojilist,
};

export class App extends React.Component<Props, State> {
    public readonly state = DEFAULT_STATE;

    public toggleEmojilist = () => {
        if (!remoteEmojilist.length) {
            return this.loadRemoteEmojis();
        }

        const currentEmojilist =
            this.state.currentEmojilist === emojilist
                ? remoteEmojilist
                : emojilist;
        return this.setState(
            {
                currentEmojilist,
                categories: getCategories(currentEmojilist),
            },
            () => this.updateCategory(this.state.selectedCategory)
        );
    };

    public loadRemoteEmojis = async () => {
        remoteEmojilist = await fetchEmojis();
    };

    public clear = () => this.setState({ output: DEFAULT_STATE.output });
    public addEmoji = (moji: string) => {
        let output = [moji];
        if (this.state.output !== DEFAULT_STATE.output) {
            output = [...this.state.output, moji];
        }
        this.setState({ output });
    };

    public removeEndEmoji = () => {
        if (this.state.output.length > 1) {
            return this.setState({
                output: this.state.output.splice(
                    0,
                    this.state.output.length - 1
                ),
            });
        }
        return this.setState({ output: DEFAULT_STATE.output });
    };

    public updateCategory = (selectedCategory: string) => {
        this.setState({
            selectedCategory,
            filteredEmojis: this.state.currentEmojilist.filter(
                makeAFilterByCategory(selectedCategory)
            ),
        });
    };

    public changeCategory = () => this.updateCategory(this.state.categories[3]);

    public onCategoryChange = (event: React.FormEvent<HTMLSelectElement>) =>
        this.updateCategory(event.currentTarget.value);

    public render() {
        return (
            <div className="typewriter">
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
                <CategorySelector
                    categories={this.state.categories}
                    onChange={this.onCategoryChange}
                    value={this.state.selectedCategory}
                />
                <button onClick={this.clear}>Clear</button>
                <button onClick={this.removeEndEmoji}>⬅️ Delete</button>
                <button onClick={this.toggleEmojilist}>
                    {!remoteEmojilist.length
                        ? "Load more!"
                        : this.state.currentEmojilist === emojilist
                            ? "use remote emojis"
                            : "use local emojis"}
                </button>
                <EmojiKeyboard
                    emojis={this.state.filteredEmojis}
                    onAddEmoji={this.addEmoji}
                    clickedKeys={this.state.output}
                />
                <EmojiDisplay>{this.state.output}</EmojiDisplay>
            </div>
        );
    }
}
```
