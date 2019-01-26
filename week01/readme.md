# Week 1

## Prerequisites

Please install [Visual Studio Code](https://code.visualstudio.com/) and the
following extensions:

-   [Jest](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [VS Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

Please install [n](https://github.com/tj/n) or
[nvm](https://github.com/creationix/nvm) to manage your Node versions.

You'll also need a Github account, if you don't already have one.


### Intro to modern JS

#### Setting up environment (incl brief intro to Jest and Parcel)
-   Parcel is a tool that needs no configuration and handles all the bundling and runs a server.
-   open a terminal and run `npm install` and when done `npm start`
-   `cmd + click` the url and there you are. Click "Week 1"
    
#### Variables - `let` and `const`

Variables are like buckets that you can store stuff in. Try adding 
```js
const greeting = "Hello me"
```
..and log to the console.

Now try adding another line of `greeting = "hello you"`.

Explain error about "greeting is read only". Change thing to
```js
const greeting = "Hello "
let person = "me"
person = "you"
```
    
#### Types: Number, String, Array, Object

Those variables were all text, the old CompSci term is "String".

##### Another type is "Number", which is fairly self explanatory.

Add `let apples = 10`, note there are no quotes. Now add 
```javascript 
    const fruit = " apples";

    console.log(apples + fruit);

    // and then
    apples = apples - 1;

    console.log(apples + fruit);
    console.log(typeof fruit);
```
##### Arrays are collections of several items. A bit like a Scrabble tray.

- Add `const typesOfFruit = ["apple", "orange", "pear", "banana"];`
- They are accessed using square brackets:
    `console.log("I would like an " + typesOfFruit[1]);`
    ...but they start from zero.
    `console.log("I would like an " + typesOfFruit[0]);`
- If you try to access an item that's not in the array, you get `undefined`.
- A really good thing about arrays is that they can tell you how big they are. Try `console.log("I have " + typesOfFruit.length + " types of fruit");`
- You can put anything into an array, e.g. `const myFavouriteThings = ["Red", 7, typesOfFruit];`
- `console.log(myFavouriteThings);`

##### Template literals (backticks)

That's getting a bit ugly. Backticks let you put variables inside a string, a bit like double quotes in PHP. Because JS variables look just like normal words, we need a way to show that they are a variable, which means they're wrapped in `${}`. Change the last example to:
``console.log(`I have ${typesOfFruit.length} types of fruit`);``
You can put any JS inside the `${}`. e.g. 
`` console.log(`I used to have ${fruit + 1} pieces of fruit`)``

##### Objects
The other complex type in JavaScript is an "Object". Where arrays allow you to store a number of things together, Object let you name those things.

- Objects are created with curly braces. e.g: 
```js
const myFavourites = {
    fruit: "passion fruit",
    vegetable: "artichokes",
    unicodeRange: "emoji" 
}
```
- You can access the members of an Object with a '.' e.g. `console.log("I would like to eat " + myFavourites.fruit);`
- Again, like Arrays and let and const, Objects can contain anything.

```js
const myFavourites = {
    fruit: "passion fruit",
    vegetable: "artichokes",
    unicodeRange: "emoji",
    number: 3.141592654,
    androidVersion: "Pie",
    list: myFavouriteThings
}
```
- Another way to access the member of an Object is with square brackets, e.g. 
`console.log("I would like to eat " +  myFavourites['fruit'])`. This is really useful if you need to access the members dynamically (where you don't know what you are going to access ahead of time).
```js

const typeOfFood = "fruit";
console.log("I would like to eat " +  myFavourites[typeOfFood]);

```
- Objects don't tell you how big they are: `console.log(myFavourites.length); //error`
- Even a `const` object can have its members changed. 

#### Functions, function expressions, arrow functions

It gets boring writing the same thing over and over again, so we use functions.

-   Write the `greet()` function.

Unlike lots of languages, functions are just another type of variable. This is really powerful, as we'll see next week, but for now we'll see you can do this:

```js
const greet = function(person) {
console.log(`Hello ${person}`)
}
```

Functions are like a small task, a bit like ordering a coffee; you tell the barista what you want and then they "return" you the coffee based on what you told them. This allows you to do stuff inside the function before you return something out of it. E.g.:

```js
function enhance(myNumber) {
    return myNumber + 1000;
}

const fruitPerDay = 5;

const enhanced = enhance(fruitPerDay);

console.log(`I used to eat ${fruitPerDay} but now I can eat ${enhanced}`);

```

There's also a shorter way of writing these function expressions, called an arrow function (we recommend you always use them):

```js
const greet = (person) => {
    console.log(`Hello ${person}`);
}
```

You can even leave off the curly braces if there's only one expression, and the round braces if there's only one argument:

```js
const greet = person => console.log(`Hello ${person}`);
```

You can also leave off `return` in that case:

```js
const superEnhance = (myNumber) => myNumber + 1000;
```
        
#### Try it!

- Create an Object that has your favourite movies in named genres, like "action", "comedy", "scifi", "romance", etc
    
    ```js
    const myFavouriteMovies = {
        action: "Starship Troopers",
        scifi: "Starship Troopers",
        comedy: "Starship Troopers",
        romance: "Starship Troopers",
        satire: "Starship Troopers"
    }
    ```
- Create a function where you pass in the genre and it returns the film  from the `myFavouriteMovies` object.

```javascript
const chooseAFilm = (genre) => myFavouriteMovies[genre];

console.log("Tonight we will be watching " + chooseAFilm("comedy"));

```

### Further reading

- [JavaScript.info: Variables](http://javascript.info/variables)
- [JavaScript.info: Functions](http://javascript.info/function-basics)
- [JavaScript.info: Arrow functions](http://javascript.info/function-expressions-arrows)
