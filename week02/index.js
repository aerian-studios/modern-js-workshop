
console.log("week 02");
console.log("week 02");

const vendingMachine = (money = 0) => {
    if(money < 1.5) {
        return "no dice";
    }
    return "A cool refreshing drink";
}

console.log(vendingMachine);

const aDrink = vendingMachine();

console.log(aDrink);

const anActualDrink = vendingMachine(2);

console.log(anActualDrink);


const addTwoTo = (value) => {
    console.log(`I'm adding two to ${value}`)
    return value + 2;
}

const three = addTwoTo(1);
// same as const three = 3;

console.log(three);

const six = addTwoTo(4);

console.log(addTwoTo(six + three));


const getSomeData = async (url) => {
    // console.log("2. About to fetch the data from " + url);
    const result = await fetch(url);
    // console.log("4. Fetching the data", result);
    const data = await result.json();
    // console.log("5. We have data", data);
    return data;
}

const isFrom2004 = (movie) => {
    return movie.Year === "2004";
}

const API_KEY = '';// Put the api key here
const findSomeMovies = async () => {

    const results = await getSomeData("http://www.omdbapi.com/?s=starship troopers&apikey=API_KEY");
    const movies = results.Search;
    const moviesFrom2004 = movies.filter(isFrom2004);
    console.log(moviesFrom2004);

    const aMovieFrom2004 = movies.find(isFrom2004);
    console.log(aMovieFrom2004);
}

findSomeMovies();

// make a function that returns a function that has access to the `year` passed into the first
const makeIsFromYear = (year) => (movie) => {
    return movie.Year === year;
}

// make a function that returns another function that has access to the `title` passed in
const makeHasTheTitle = (title) => (movie) => {
    return movie.Title.toLowerCase() === title;
};

const findAMovieByYear = async (title, year) => {
    const url = `http://www.omdbapi.com/?s=${title}&apikey=API_KEY`;
    const results = await getSomeData(url);
    const movies = results.Search;
    let aMovie;

    if(year) {
        const isFromTheYear = makeIsFromYear(year);
        aMovie = movies.find(isFromTheYear);
    } else {
        const hasTheTitle = makeHasTheTitle(title);
        aMovie = movies.find(hasTheTitle);
    }

    try {
        console.log(`I like the movie "${aMovie.Title}" from the year ${aMovie.Year}`);
    } catch (error) {
        console.warn(`I can't think of a movie I like called "${title}"`);
    }
}

findAMovieByYear('starship troopers', '1997');
findAMovieByYear('dead man');
findAMovieByYear('baron munchhausen', "1989");