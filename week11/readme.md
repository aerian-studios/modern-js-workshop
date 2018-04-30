# Working with the ideas of React

This week we used 5 tasks designed to help us reason about the best ways of
working with React. Specifically, we are interested in the way that State and
Props are used and cause the Components that use them to render.

## Task 1 - Disable an emoji button once it is used once

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
interface State {
    // Convert output to array of strings
    output: string[];
    emojilist: Emoji[];
    categories: string[];
    filteredEmojis: Emoji[];
}

interface Props {}

const DEFAULT_CATEGORIES = getCategories(emojilist);
const DEFAULT_CATEGORY = DEFAULT_CATEGORIES[1];

const DEFAULT_STATE: State = {
    // Needed to wrap this in array brackets
    output: ["Type your emoji"],
    categories: DEFAULT_CATEGORIES,
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

    // See below for more discussion here
    public addEmoji = (moji: string) => {
        let output = [moji];
        if (this.state.output !== DEFAULT_STATE.output) {
            output = [...this.state.output, moji];
        }
        this.setState({ output });
    };

    public updateCategory = (selectedCategory: string) => {
        this.setState({
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

So as you can see, we converted the output into an array easily enough and were
able to use the array method, `includes` to set buttons to disabled without
changing where application state is controlled or changing our components
unnecessarily. The best thing about this pattern is that we get the buttons back
for free, because when we hit clear the calculation of which buttons are
disabled is from the same piece of state.

The one consideration is in the `addEmoji` method. The consideration is a
function programming one - we don't like to mutate state and some array methods,
like push mutate the original array. We've used a combination of array
`destructuring` and `rest` to make a new array made up of the old state and add
our new moji: `output = [...this.state.output, moji];`

## Task 2 - Disable an emoji button once it has been used 3 times

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

## Task 3 - Add a delete button

*   The delete button should remove a character from the end of the EmojiDisplay
*   When there are no characters left, it should return to the default value

## Task 4 - Set the currently selected value of the categories with State

## Task 5 - User selected emoji list

*   Create a button that loads the remote emojiList if it isn't loaded
*   If it is loaded, use the button as a toggle for the remote list or the local
    list
