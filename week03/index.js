const getSomeData = async (url) => {
    const result = await fetch(url);
    const data = await result.json();
    return data;
}

const isAMovie = (movie) => {
    return movie.Type === "movie";
}

const API_KEY = "";

const getTitle = (movie) => {
    return movie.Title;
}
const getReview = (movie) => `${movie.Title} is amazing`

const hasAPoster = (movie) => movie.Poster !== "N/A";

const getPoster = (movie) => `<img src="${movie.Poster}" />`;

const findSomeMovies = async () => {
    const result = await getSomeData(`http://www.omdbapi.com/?s=star trek&apikey=${API_KEY}`);
    
    const posters = result.Search
        .filter(hasAPoster)
        .map(getPoster)
        .join("\n");


    document.body.innerHTML = posters;
    console.log(posters);
}

findSomeMovies();

const arrayToDecontruct = [1, 3, 5, 7, 9];

const [firstItem, bob, baz] = arrayToDecontruct;

arrayToDecontruct[1] = "dave";

console.log(firstItem);
console.log(bob);
console.log(baz);
console.log(arrayToDecontruct);

const myShelf = ["Lefthand of darkness by Ursula K. LeGuin", 
"The Angel of the North by Anthony Gormley", 
"Deconstructing Zoe by Rosa Fong", 
"Starship Troopers by Paul Verhoeven"];

const [book, statue, ...everythingElseOnTheShelf] = myShelf;

console.log(book);
console.log(everythingElseOnTheShelf);

const myFavourites = {
    fruit: "passion fruit",
    vegetable: "artichokes",
    unicodeRange: "emoji",
    number: 3.141592654,
    androidVersion: "Pie",
    wood: "Oak"
}

const {vegetable, fruit, ...inedibleStuff} = myFavourites;

console.log(inedibleStuff)

const attrs = {
    id: "foo",
    src: "http://placekitten.com/100/200",
    ariaLabel: "Kitteh"
}

const {src, ...validAttrs} = attrs;

const everythingInMyRoom = ["Pot plant", "sofa", ...myShelf, ...arrayToDecontruct];

console.log(everythingInMyRoom)

const theBestStuff = {...myFavourites, fruit: "ugli fruit", ariaLabel: "doggo", ...attrs}

console.log(theBestStuff)

const defaults = {
    port: 80,
    server: "placekitten.com"
}

const args = {
    port: 443,
    timeout: 6000
}

const params = {...defaults, ...args};

const state = {
    title: "hello",
    clicked: 2
}

const newState = {
    ...state,
    clicked: state.clicked + 1
}

const bestMoviesEvar = (movieA, movieB, movieC, ...moarMovies) => `
My top movies are:
${movieA}
${movieB}
${movieC}
These suck: ${moarMovies.join()}
`;

const movies = [
    "Starship Troopers", "Mean Girls", "Total Recall", "Paddington 2"
]


const topThree = bestMoviesEvar(...movies)
console.log(topThree)


const getStuffFromAServer = ({server, port, ...rest}) => {
    console.log(`//${server}:${port}`);
    console.log({...rest, port: 80, server})
}


getStuffFromAServer(params)