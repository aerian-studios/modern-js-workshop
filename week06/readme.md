## Week 6: :cake: Functional progamming is a piece of :cake:

This week we're going to learn and implement "Functonal Programming" in 3 easy
slices. Before we start, it is worth remembering that coding is a process and
that process is seldom complete. The level of completeness should be dictated by
the requirements of the project/situation. Equally, the process of refactoring
code towards Functional Perfection follows the same rules.

### What the heck is functional programming?

I know, you write functions all the time right? That's what functional
programming is... but with a couple of requirements for the "shape" of the
functions - I like to think of them as the 3 sponge layers of my coding cake:

1.  :facepunch: No side effects: - this is often called "Purity".
2.  :gemini: Always returns the same thing given the same input - opaquely known
    as "referential transparency"
3.  :one: Single purpose: - this is just good practice.

One other notable thing that people say about FP (Functional Programming) is
that you write **What** you want to happen rather than **How** it should happen.
We'll look at this later.

### Yeah, but what the heck is functional pragramming?

Really, it is just the practice of converting your functions follow those ideas
**where possible**. Let's use an example. A very contrived example. You are
passed the area of a square and you need to calculate the volume of a cube with
that square.

If we break that down: _area_ is calculated by `sideLength * sideLength` or
<code>sideLength<sup>2</sup></code> and _volume_ is
`sideLength _ sideLength _ sideLength` or <code>sideLength<sup>3</sup></code>.

A first attempt might looks something like this:

```javascript
export const calculateCubeFromSquare = (squaredNo) => {
    const baseNo = Math.sqrt(squaredNo);

    return squaredNo * baseNo;
};

const twentySeven = calculateCubeFromSquare(9);
```

Guess what? That's a _pure_ function (no side effects) **and** it always returns
the same thing given the same input - the first 2 points from our requirements.
BOOM! walk away... Walking away is the correct thing to do; there is no need to
optimise until you have good reason.

As a matter of interest, it is worth noting 2 things about the code above (apart
from the fact that it is awesome FP goodness and you didn't even have to try):

1.  Because it does follow our two main principles of FP, we **can** say things
    like `const twentySeven = calculateCubeFromSquare(9);` or
    `const nine = calculateCubeFromSquare(3);` - it is like the function can be
    replaced by the value it outputs. This is because we know that our function
    isn't reliant on any outside factors (it's pure) and because it doesn't do
    anything that is subject to change (referetial transparency). This is an
    important thing for a number of reasons, not least because we can stop
    thinking about it so hard and reduce our cognitive load and we can test this
    function really easily to make sure we're can stop thinking about it.
2.  If we really want to be picky about it, that function is really doing 2
    things (it doesn't have the 3rd sponge)... it calculates a base number from
    a squared number and then calculates a cubed number... just saying.

Okay, let's say for the sake of practice that you **had a good reason to
refactor** according to the best practice of "single purpose", what would that
look like?

Glad you asked, we need a function to do each of the parts of that single
function: a `calculateBaseFromSquare` and a `calculateCube`.

```javascript
// Sorry for this silly function, it's just for illustration
export const calculateBaseFromSquare = (squaredNo) => Math.sqrt(squaredNo);
export const calculateCube = (number) => number ** 3; // ** syntax is in the latest version of javascript

const three = caculateBaseFromSquare(9);
const twentySeven = calculateCube(three);
```

Okay done, now take your hands off the keyboard and walk away; now we have a
more generic function that allows us to calculate cubes against any number and
we can now also calculate base numbers should we need to... Your application
just got more extensible, more testable and more reusable, and it is easy to
read. What more do you want?

Well, seeing as you asked. I did say that you could treat these fancy pure functions as if they were
the value they returned... `caculateBaseFromSquare(9)` always returns `3`. Every
time. So if you wanted to you could do this:

```javascript
export const calculateBaseFromSquare = (squaredNo) => Math.sqrt(squaredNo);
export const calculateCube = (base) => Math.pow(base, 3); // continue the theme of replacing the javascipt Math methods :|

const twentySeven = calculateCube(caculateBaseFromSquare(9));
```

Let me stress right now, you shouldn't do this if you don't feel comfortable
with it. You could make the biggest difference to the extensibility, testability
and reusability of your code by simply focussing on those 3 sponges above. 

...Nevertheless, just for the sake of argument,
if you want to follow the :rabbit: down this deep dark hole you've just
discovered...

### Welcome to Higher Order Functions

High what now? Higher Order Functions, it's just a fancy way of saying that you can
pass a function as a parameter to another function, or that a function can
return a function. This is just a feature of javascript, but combined with our 3
sponges, we can start doing something very interesting.

Let's just look at that last line again without all the previous lines:

```javascript
// ... code
const twentySeven = calculateCube(caculateBaseFromSquare(9));
```

Notice that is that you have passed one function as the parameter of
another. You've probably done this a lot without realising it using jQuery or
eventListeners or timeouts. You've been using HOFs. Nice. This works because the
inner function returns something that the outer function expects, the above
wouldn't work if the inner function returned `undefined` or a date, etc.

Something very cool about it is that it is saying **What** is happening rather than **How** that number
is being converted? Without reading anything else I can see that it is saying it
expects a squared number, that it will return the base number from that, and
then it will calculate a cubed number. It isn't saying how any of that is done,
and theoretically I never need know. So it is cutting out a whole lot of reading
time and thinking time.

Finally, something odd, you kind of have to read that backwards, or from the
inside out - `caculateBaseFromSquare` before `calculateCube`. This can take
getting used to, but that is all, it just needs a bit of practice. We've swapped
one type of long term cognitive load (all the **How** of things) for a shorter
term cognitive load (new syntax). You may decide never to do this. Up to you.

So this hole goes deeper... :hole:

When you return a function from another function, things get really spanky.

To have a look at this let us finally leave my horribly contrived example alone
and look at the aim for this week; we want to get some emoji by their 'category'
and add them to the heading.

Let's start with the function as we might write it first time around and then
spend time practicing the 3 sponges and looking at some functional icing.

```javascript
import {
    fetchEmojis,
    insertEmoji,
    extractMojis
} from "../lib/emojilib.js";

export const run = () => {
    const emojis = await fetchEmojis();

    const crowd = emojis
        .filter((emoji) => {
            return emoji.category == 'faces'
        })
        .map(extractMojis);

    insertEmoji(crowd);
};

run();
```

![Piece of cake](https://media.giphy.com/media/y53NWXQReeTII/giphy.gif)

We've reused some code here as can be seen in the import statement, which is
great. The function is nice and readable. But let's apply our sponge criteria to
it.

1.  Does is have no side effects? **No,** it relies on an external data and it
    writes to the DOM.
2.  Does it return the same thing every time? **No** - what happens if the API
    breaks for example?.
3.  Does it do one thing? **No** - it fetches the data, filters and maps as well
    as adding to the DOM.

![code rage](https://media.giphy.com/media/LBYy3J4YTrlte/giphy.gif)

It is worth pausing now and saying that it is not possible to make an
application without side effects, but we will always try to keep it siloed to
reduce the parts of your application that rely on it.

Although, eventually there'll be a general preference for FP in your coding
style, everything you write need not be FPtastic. Remember the first rule of TDD
is to write as much code as passes the test, no more. So the following steps are
increments of refactoring, you'd stop where it makes sense to stop.

We're going to pretend that it has been requested that any emoji category can be
chosen, not just faces. When we do that, we can see that the following code will
need to be repeated for every category that we want, which is inefficient:

```javascript
const crowd = emojis
    .filter((emoji) => {
        return emoji.category == "faces";
    })
    .map(extractMojis);
```

So it makes an excellent candidate for refactoring. Let's describe **What** it
does to try understand what we need to refactor: 1. It gets emojis by category
and 2. it extracts the moji from that.

So we're going to need a way to take a category and return only emojis we need.

```javascript
export const filterEmojisByCategory = (category, emojis) => {
    return emojis.filter((emoji) => {
        return emoji.category === category
    });
}

// which we can shorten if we want
export const filterEmojisByCategory = (category, emojis) => emojis.filter((emoji) => emoji.category === category;

// and we'd use it like this
const facesEmojis = filterEmojisByCategory('faces', emojis);
const gestureEmojis = filterEmojisByCategory('gesture', emojis);
//etc

//... and then get the mojis
const facesMojis = facesEmojis.map(extractMojis);
const gestureMojis = gestureEmojis.map(extractMojis);
```

That is neater! We've reduced some repetition and made a more reusable
function. I'd be tempted to leave it there...

...But seeing as we're in a rabbit hole, let's look around a bit by using HOFs,
but this time rather than than passing in a function, we return a function...
we'll look at why after we have done it.

```javascript
const isTheRightCategory = (emoji, category) => emoji.category === category;

export const makeAFilterByCategory = (category) => (emoji) =>
    isTheRightCategory(emoji, category);

export const makeExtractFunctionByCategory = (category) => (emojis) => {
    const myFilter = makeAFilterByCategory(category);
    return emojis.filter(myFilter);
};

// which can be shortened to:
export const makeExtractFunctionByCategory = (category) => (emojis) => emojis.filter(makeAFilterByCategory(category));

// you would use the above like this:
export const getFaces = makeExtractFunctionByCategory("faces");
const facesEmojis = getFaces(emojis);

//... and then get the mojis
const facesMojis = facesEmojis.map(extractMojis);
```

But how can that be any better!? Everything just got really confusing... and
there are more lines.

I agree that it looks more confusing, plus WTF is going on with all those arrow
functions?

Let's go over it step by step.

At the top we have a function that returns `true` or `false` depending on a
category matching the emoji category. This type of function is called a
"predicate" (returns a boolean based on some criteria). By making it a
standalone function we remove the coupling to the data structure, so if emojis
decided to change its structure, like have multiple categories, we could
refactor this single function without affecting the rest of the code... so
bonus.

Then we have `makeAFilterByCategory`... it takes a `category` parameter and
returns a new function that takes an `emojis` parameter that returns our
predicate from above (i.e. true or false). :exploding_head: It's like functional
inception.

![Functional MAGIC](https://media.giphy.com/media/QS0geEzR9KHBu/giphy.gif)

It, `makeAFilterByCategory`, is a bit like a factory that makes new functions
whose only job is to filter by the `category` that is passed in to it. You could
use it to make a function to filter by "faces" like this
`const facesFilter = makeAFilterByCategory('faces');` and that would mean that
`facesFilter` now could be given an emoji and it would return true or false
depending on whether it matched the category of "faces".

![Errrr](https://media.giphy.com/media/Lk5U0TghPOUBG/giphy.gif)

In FP, we would say that `facesFilter` was a "Partial Application", which is a
way of saying that we've only partially completed calling the full
functionality - we still have to call `facesFilter` with an emoji, but every
time we call it, it will only ever apply the filter for the faces category. This
can be very powerful, because we can setup any number of filters this way.

This type of thing is based on the 3 sponges of making our functions pure and
referentially transparent and ideally single purpose; it can only be possible if
each function involved reliably returns the same thing given the same input. But
it means we can create some decoration for our cake!

To actually extract the emojis, we have another generic function that uses those
functions, `makeExtractFunctionByCategory`. Notice that this one doesn't just
filter the emojis, it returns another function that expects the emojis array as
a parameter. This means that we can use partial application to make our filtered
lists.

Let's step back and make note of the fact that we have just made 4 entire
functions simply to to filter an array generically! That seems crazy. Or to spin
it another way, it seems like every time that we make a function, we make
another one and then another one with fewer and fewer responsibilities and then
we compose them together to build up functionality. When put like that is sounds
a bit more palatable I suppose because we know that single purpose is good mkay.

To put it more in this light, let's look at how we might use all this - I have
moved all the functions that deal with the nuts and bolts (the **How**) into
`emojiLib`:

```javascript
import {
    makeExtractFunctionByCategory,
    fetchEmojis,
    insertEmoji,
    extractMojis,
    join,
} from "../lib/emojilib.js";

export const getFaces = makeExtractFunctionByCategory("faces");

const run = async () => {
    const emojis = await fetchEmojis();

    const crowd = extractMojis(getFaces(emojis)).join();
    insertEmoji(crowd);
};

export default run;
```

All of a sudden, that is looking quite nice! All the side effects are in one
please, the `run` function. And look at `crowd`, we've added a `join` so that we
can control the string output, but it reads like our sentences above where we
describe **What** we want to happen:

1.  It gets emojis by category and
2.  it extracts the moji from that.

Notice the order is reversed as before and that the sentences of the code are
even more expressive and specific than our original description! It does take a
while to learn to read this type of code, but once you can it is very easy to
reason about.

While we're here we might as well make it easier to read as well by introducing
a utility from FP languages called "compose". Whenever you have functions within
functions, this is called "composition", but it can be a little hard to read! So
we're going to wrap all of that in a utility function called `compose` to make
it more readable. `compose` takes a list of functions and calls each one in
reverse order with the output from the previous one. It will return a function
so you can pass in your first parameter.

```javascript
import {
    makeExtractFunctionByCategory,
    fetchEmojis,
    insertEmoji,
    extractMojis,
    join,
} from "../lib/emojilib.js";
import { compose } from "../lib/compose.js";

export const getFaces = makeExtractFunctionByCategory("faces");

// we can extract the faces here
export const makeACrowd = compose(join, extractMojis, getFaces);

const run = async () => {
    const emojis = await fetchEmojis();

    const crowd = makeACrowd(emojis);
    insertEmoji(crowd);
};

export default run;
```

Hopefully this final, tastily readable snippet has been worth the wait. It all
comes from those first 3 sponges, _no side effects, single purpose, and the
consistent output given the same input_. The best thing you can do is practice
making the sponge before you rush into decorating your cake with all that
compositional sugar.

Happy baking!

### Resources

*   [Compose function](https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83)
*   [Ramda functional programming library for javascript](http://ramdajs.com/)
*   [More on FP](https://github.com/getify/Functional-Light-JS/)
