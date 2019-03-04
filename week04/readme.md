# Week 4: Modules and not classes

## Mods Rule!

Okay, so we've learned about different types of data and how they are
structured. We've learned how to work with some of those structures and we've
learned that functions are the way we do things. By now you've probably noticed
that we have been putting quite a lot of "stuff" in our weekly file, and if
you've been trying to find something in that file, you've probably been
scrolling about wondering where it is.

This tells us that we need to start thinking about structuring our code; that is
to say we need to start splitting our code into discreet pieces. But how dow we
do that?

### Step 1

The first step is to understand when to split something out into its own thing
and when not to. It is not always right to split code, so the best way to do
know when to do it is to not think about it - you should have some rules so you
don't spend time debating whether to or not... and here they are - the rule of
threes:

1. There are effectively 3 types of code units `functions`, `classes` and
   `modules`.
2. `functions` **should (1) ideally only do 1 thing** and **should (2) be named
   as a verb describing the thing it does**. They should also, ideally **(3) be
   no more than 7 lines long**.
    - This means that if your function does more than 1 thing, split it up
    - This means if your function is more than 7 lines long, consider splitting
      it up
3. `classes` are collections of functionality and I'd rather not talk about them
   yet...
4. `modules` are **(1) collections of functionality or functions that have a
   broad purpose** and **(2) can be imported and re-used in other code**. The
   module should be **(3) named after this purpose**, this will help focus your
   mind.
    - This means that if there is something in your module that can't be
      described by your module name, put it in it's own module.
    - Modules should be "stateless" - no memory.

### Step 2

Step 2 is actually recognising when you should split and what to split.

#### Splitting the atom

Sooo... let's look at functions first as it will review some of last week's work
at the same time as illustrate the process.

```javascript=
const userData = [
    { name: "mister", familyName: "Ben" },
    { name: "johnny", familyName: "rico" },
    { name: "William", familyName: "Adama", rank: "Admiral" },
];

const splitOutUserNamesAndFormatThemNicely = (usernames) =>
    usernames.map((user) => {
        const { name, familyName } = user;

        const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
        const capitalFamilyName =
            familyName.charAt(0).toUpperCase() + familyName.slice(1);

        return `${capitalName} ${capitalFamilyName}`;
    });

const niceFormatNames = splitOutUserNamesAndFormatThemNicely(userData);

console.log(...niceFormatNames);
```

Outputs the names nicely, less than 7 lines long... but are we following our 3
function rules? The clue is in the name and another clue is in the DRY accronym.
By carefully naming our function as a _ verb that describes what it does_, we
can see the word "And" in there... which means that we are not only doing 1
thing in the function, despite the function being less than 7 lines long. Also
you can see that we are performing exactly the same capitalisation
transformation on both the `name` and the `familyName` strings, this means that
we are repeating our selves (not DRY).

#### Mini task

Refactor the above code so that it follows our 3 rules for functions.

```javascript=
const userData = [
    { name: "mister", familyName: "Ben" },
    { name: "johnny", familyName: "rico" },
    { name: "William", familyName: "Adama", rank: "Admiral" },
];

const capitaliseWord = (word) =>
    `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const splitOutUserNames = (usernames) =>
    usernames.map((user) => {
        const { name, familyName } = user;

        return `${capitaliseWord(name)} ${capitaliseWord(familyName)}`;
    });

const niceFormatNames = splitOutUserNames(userData);

console.log(...niceFormatNames);
```

See how much more readable the function is; the return from the map function in
`splitOutUserNames` reads like a sentence that describes _what_ we are doing,
not a bunch of code of _how_ we are doing it.

##### Splitting the modulecule

Now then, modules. I've described what they are conceptually, but what are they
actually? Let's make the above code into a module

```javascript=
// userModel.js
const userData = [
    { name: "mister", familyName: "Ben" },
    { name: "johnny", familyName: "rico" },
    { name: "William", familyName: "Adama", rank: "Admiral" },
];

export const capitaliseWord = (word) =>
    `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const splitOutUserNames = (usernames) =>
    usernames.map((user) => {
        const { name, familyName } = user;

        return `${capitaliseWord(name)} ${capitaliseWord(familyName)}`;
    });

export const niceFormatNames = splitOutUserNames(userData);

console.log(...niceFormatNames);
```

We have put the keyword `export` in front of some of the variable names... and
named the file after the broad purpose that unites the functions in the file.
The keyword `export` allows other code to `import` the named variables and the
file name gives us a focus for our module. Let's see it in use:

```javascript=
// App.js

import {
    niceFormatNames,
    userData /* throws userData not found in './userModel' */,
} from "./userModel";

document.body.innerHTML = niceFormatNames.join(", ");

// Check non-imported
console.log(splitOutUserNames); // Error: splitOutUserNames is undefined
```

We import the variable that holds the nicely formatted names. Notice that we
don't need to add the `.js` file type to the import statement? Also import
statements tend to go at the top of a module. Notice also that we can't
reference things we haven't imported or exported? We can import any exported
member of the module, which allows us to for example re-use the
`splitOutUserNames` function on our own data once we export it:

```javascript=
// App.js
import { splitOutUserNames } from "./userModel";

const userData = [
    { name: "Johnny", familyName: "Mnemonic" },
    { name: "Count", familyName: "zero" },
];

const myUserNames = splitOutUserNames(userData);

document.body.innerHTML = myUserNames.join(", ");
```

So we can say about our module that it fulfills rule 2 (import and re-use) and
rule 3 (name describes what it's for), but does it fullfill rule 1? Are all the
functions and variables in it described by its name?

#### Mini task

Refactor the module to only have appropriate code and import the code from any
new modules that you create (which should fullfill the 3 rules of modules).

```javascript=
// userModel.js
import { capitaliseWord } from "./stringUtitlities";

const userData = [
    { name: "mister", familyName: "Ben" },
    { name: "johnny", familyName: "rico" },
    { name: "William", familyName: "Adama", rank: "Admiral" },
];

const splitOutUserNames = (usernames) =>
    usernames.map((user) => {
        const { name, familyName } = user;

        return `${capitaliseWord(name)} ${capitaliseWord(familyName)}`;
    });

export const niceFormatNames = splitOutuserNamesAndFormatThemNicely(userData);
```

```javascript=
// stringUtilities.js

export const capitaliseWord = (word) =>
    `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
```

### Default exports

The import syntax above that looks a bit like the destructuring we did last
week, `import { someVar } from "./someModule"`, is called "named" imports; we
have to name the exports that we want to make available and equally we have to
know and name the import that we want. It is possible to possible to set a
default export and that changes the import syntax a bit:

```javascript=
// sums.js

export const addThreeNumbers = (first, second, third) => first + second + third;

const addTwoNumbers = (first, second) => first + second;

// notice the "default" keyword
export default addTwoNumbers;
```

```javascript=
// App.js
import anyNameIWant from "./sums";

console.log(anyNameIWant(13, 1)); // 14
```

There are 3 things to note about this default export usage:

1. Use the `default` keyword for the variable to export
2. I mustn't use the `{}` to wrap my import variable name
3. I can call the variable anything I want.

Having a default export doesn't affect other exports and you can import defaults
and named exports from the same file.

```javascript=
// App.js
import anyNameIWant, { addThreeNumbers } from "./sums";

console.log(anyNameIWant(13, 1)); // 14
console.log(addThreeNumbers(7, 6, 1)); // 14
```

### Heeellooo NPM!

If you can re-use your own modules, that means that you can re-use other
people's modules. [NPM](https://npmjs.com) has made it incredibly easy to
download and use externally developed libraries. Let's do some nice image
gallery for our movies with
[bricksjs image lib](https://www.npmjs.com/package/bricks.js)...

```bash=
npm install bricks.js
```

### Er... hello node_modules?

So now that you've installed it, where have you installed it; how do you use it?
how do you import it?

Well, it is installed into a folder called `node_modules` relative to the
`npm install` command. In our case, the root of our repo. Open it up... pretty
busy in there eh? Consider your installs...

How you use it is documented on thats npm page. Their instructions start with a
bunch of older attempts at modules UMD, CommonJs, etc, but if we look at the
instructions for "ES Modules", the syntax is very familiar:

```javascript=
import bricks from "bricks.js";
```

(Actually, because our bundler is Parcel, we don't even have to run the
`npm install` step, we can just type the above import statement and Parcel will
autmatically install it into node_modules!)

Because we have installed the library to `node_modules`, that import statement
becomes much simpler because the bundlers we use assume that you are importing
from `node_modules` if you don't provide a path. If you look in `node_modules`
you will see the bricks.js folder.

Okay, let's make a grid of posters for our favourite movies using modules and
this npm package.

```javascript=
// movieModel.js
const API_KEY = "";

const hasAPoster = (movie) => movie.Poster !== "N/A";

const getPoster = (movie) =>
    `<img src="${movie.Poster}" alt="${movie.Title}" />`;

export const findSomeMoviePosters = async (key = "star trek") => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?s=${key}&apikey=${API_KEY}`
    );

    const posters = result.Search.filter(hasAPoster).map(getPoster);

    return posters;
};
```

```javascript=
// movieData.js
const getSomeData = async (url) => {
    const result = await fetch(url);
    const data = await result.json();

    return data;
};
```

```javascript=
// index.js
import bricks from "bricks.js";
import { findSomeMoviePosters } from "./movieModel";

const addPosterBricks = async () => {
    const moviePosters = await findSomeMoviePosters("zatoichi");

    document.body.innerHTML = moviePosters.join(" ");

    const inst = bricks({
        container: document.body,
        packed: "data-packed",
        sizes: [
            { columns: 2, gutter: 10 },
            { mq: "768px", columns: 3, gutter: 25 },
            { mq: "1024px", columns: 4, gutter: 50 },
        ],
    });

    inst.pack();

    // resize event needs work too.
};

addPosterBricks();
```

So you can see that modules are a great way to combine and share code and npm
gives you access to a huge world of possibilities! But beware of bad packages
and beware of bloat. Remember to look at weekly downloads, open issues, last
updated and github stars as some indicators of package quality...
