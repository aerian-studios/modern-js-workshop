let greeting = "hello world";
console.log(greeting);

greeting = "hello everyone";
console.log(greeting);

let apples = 10;

const fruit = "apples";

console.log(apples + " " + fruit);

apples = apples + 1;

console.log(apples + " " + fruit);

console.log(typeof fruit);

const typesOfFruit = ["apple", "orange", "pear", "banana"];

console.log(typesOfFruit);

console.log(typesOfFruit[0]);

console.log(typesOfFruit.length);

console.log(typesOfFruit[4]);

typesOfFruit[9] = 20;

console.log(typesOfFruit[9]);

console.log(typesOfFruit);

console.log("I have " + typesOfFruit.length + " types of fruit, and the first one is " + typesOfFruit[0]);

console.log(`I have ${typesOfFruit.length} types of fruit, and the first one is ${typesOfFruit[0]}`);

const myFavourites = {
    fruit: "passion fruit",
    vegetable: "artichoke",
    number: 3.1415,
    androidVersion: "pie",
    unicodeRange: "emoji",
    list: typesOfFruit,
    length: 2
}

console.log(`My favourite fruit is ${ myFavourites.fruit }`);

console.log(myFavourites);

console.log(myFavourites.length);

const thing = "fruit";

console.log(myFavourites[thing]);


const greet = function (person) {
    console.log(`Hello ${person}`)
}
myFavourites.action = greet;

greet("Gyula");
greet("Ben");
greet("Jason");
greet();

console.log(myFavourites);


const enhance = (myNumber) => myNumber + 1000; 


const fruitPerDay = 5;

const moreFruit = enhance(fruitPerDay);


console.log(`I used to eat ${fruitPerDay} pieces of fruit per day, but now I eat ${moreFruit}`);


const myFavouriteMovies = {
    action: "Starship Troopers",
    scifi: "Starship Troopers",
    comedy: "Starship Troopers",
    romance: "Starship Troopers",
    satire: "Starship Troopers"
}


const chooseAFilm = (genre) => myFavouriteMovies[genre];

console.log("Tonight we will be watching " + chooseAFilm("comedy"));

