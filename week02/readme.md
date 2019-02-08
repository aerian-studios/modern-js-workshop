# Week 2
# Week 2

### Async and arrays

#### Remember functions?

Functions are a way to *do something*. They are like a machine that performs a task (and sometimes that results in them giving you the result of that task). When we assign them to variables we have to remember to turn the machine on by calling them with the brackets - `myFunction()`. Sometimes when we turn them on we have to give them something to work with - `myFunction(someValue)`...

For example, imagine there is a `vendingMachine` function that accepts a pound coin and returns a can of Coke (other fizzy drink are available). We can't drink `vendingMachine`, but if we call it we're asking it to performs a job, and can then use the thing it returns.

```javascript=
const vendingMachine = (money = 0) => {
    if (money < 1.50) {
        return "No drink for you";
    }
    return "A cool refreshing drink";
}

console.log(vendingMachine); // Shows the machine itself

console.log(vendingMachine(1.50)) // "A cool refreshing drink"

```

A more practical example...


```javascript=

const addTwo = (myNumber) => myNumber + 2;
};

console.log(addTwo);// logs the actual function/machine

console.log(addTwo(2));// logs the result of the machine performing something, in this case 4.
```

If a function `returns` something, like the arrow function `addTwo` above, when you call it, it is the same as writing the value that is returned directly, which means something special if you assign it to a variable because then the variable *becomes* the value that the function gives back - `const refreshingDrink = vendingMachine(1.50);` is the same as `const refreshingDrink = "A cool refreshing drink"` because that function returns that string value to us.

```javascript=
    // rewritten for clarity
    const addTwo = (myNumber) => {
        return myNumber + 2;
    }
    
    const aMediumSizedNumber = addTwo(2); 
    // The same as writing const aMediumSizedNumber = 4;
    
    const aLargeNumber = addTwo(4);
    // the same as writing const aLargeNumber = 6;
    
    console.log( aMediumSizedNumber + aLargeNumber); // 10
```

#### Async flow

Normally when you write JavaScript the code has a flow like a sentence, from one statement to the next. This is simple to work with, but means that if there's a task that takes a long time, it can make everything freeze up while it waits for the result. For example, if we want to fetch some data over a network, we don't want the whole page to become non-responsive while we wait for the server to respond. What we need is a way to wait for the result, but carry on with other tasks in the meantime.  

Async flow lets you do this. Something like taking some checques and £10 worth of 1p coins to pay into a bank account; rather than wait for the teller to count all the coins before you can pay in the cheques, they pass the coins to someone else to count while they get on with the rest of the payments. When the other person has counted the coins they can come back and the teller can add the £10 to the account.

Traditionally it has been really hard to understand the async flow, but modern JavaScript gives us async/await methods that make it seem like the conversation never got interupted by the phone call.

Async functions look like this:

```javascript=
const getSomeData = async (url) => {
    console.log("About to fetch the data from " + url);
    const result = await fetch(url);
    console.log("Fetching the data")
    const data = await result.text();
    console.log("Got the data, here it is");
    
    console.log(data);
}
console.log("About to call the async function");
getSomeData("http://www.omdbapi.com/?s=mean girls&apikey=");
console.log("Do other useful stuff");

```
Notice the word `async` before the function and the `await` instructions. This reads like normal, but actually the JavaScript engine can go off and perform other tasks each time it hits an `await` instruction, so nothing freezes up + you get the readability. Now take a little time to consider which order you expect the logs to be executed...


Notice the order of the console logs:

```bash
About to call the async function index.js:13
About to fetch the data from http://www.omdbapi.com/?s=mean girls&apikey= index.js:5:4
Do other useful stuff
Fetching the data index.js:7:4
Got the data, here it is
...
```

The async flow allowed the javascript to go off and do other useful things while it was waiting for the API call to return something.


### Dealing with data structures (Array methods)

Typically data retrieved from API, etc, are structured using the basic types that we covered last week; strings, numbers, arrays and objects.

The text that we've received from the API is in a format called JSON - which stands for JavaScript Object Notation. This is such a common format that `fetch` includes tools to handle it automatically. Just change `result.text()` to `result.json()`

```javascript=
const getSomeData = async (url) => {
    console.log("About to fetch the data from " + url);
    const result = await fetch(url);
    console.log("Fetching the data")
    const data = await result.json();
    console.log("Got the data, here it is");
    
    console.log(data);
}
console.log("About to call the async function");
getSomeData("http://www.omdbapi.com/?s=mean girls&apikey=");
console.log("Do other useful stuff");

```

Notice the `Search` member is a list or array of results? What happens if we don't want all of the results or we want them in a different order, or something? Luckily JS provides us with some powerful tools for working with arrays.


Let's say that we just want the episodes from 2004. JS provides us with the `array.filter` function that er... "filters" the list based on some criteria. The criteria can be quite complicated, so it expects something that will do the citeria checking for it - a "checking machine" - which is to say a function whose sole task is to say yes or no based on the criteria.

```javascript=
const getSomeData = async (url) => {
    console.log("About to fetch the data from " + url);
    const result = await fetch(url);
    console.log("Fetching the data")
    const data = await result.json();
    console.log("Got the data, here it is");
    
    console.log(data);
    return data;
}

const findSomeMovies = async () => {
    const result = await getSomeData("http://www.omdbapi.com/?s=mean girls&apikey=");
    
    const movies = result.Search;
    
    const moviesFrom2004 = movies.filter((movie) => {
        return movie.Year === "2004";
    });
    
    console.log(moviesFrom2004);
}

console.log("About to call the async function");
findSomeMovies();
console.log("Do other useful stuff");

```

As you can see the filtered array gives us back a new array with 2 results in it, but I've just decided I only want one :p. So let's use another array function/method, `find` to return the first result that matches our "2004" criterion.

`Array.find` gives us some useful things on top of directly accessing the first element in the array, such as handling the situation when there are no results.

```javascript=
const getSomeData = async (url) => {
    console.log("About to fetch the data from " + url);
    const result = await fetch(url);
    console.log("Fetching the data")
    const data = await result.json();
    console.log("Got the data, here it is");
    
    console.log(data);
    return data;
}

const findSomeMovies = async () => {
    const result = await getSomeData("http://www.omdbapi.com/?s=mean girls&apikey=");
    
    const movies = result.Search;
    
    const moviesFrom2004 = movies.filter((movie) => {
        return movie.Year === "2004";
    });
    
    console.log(moviesFrom2004);
    
    const aMovieFrom2004 = movies.find((movie) => {
        return movie.Year === "2004";
    });
    console.log(aMovieFrom2004);
}

console.log("About to call the async function");
findSomeMovies();
console.log("Do other useful stuff");

```

Apart from this being a very artificial example whose sole aim is to introduce you to `filter` and `find`, one final bit of cleaning up that we can do: notice that we use *exactly* the same code in our `movies.filter` and our `movies.find`? There are a couple of reasons why this isn't great, but the most obvious is if we want to change the year we are interested in, we have to change it in 2 places.

We can make this much better by making a variable out of our "checking machine" (the function that checks our criterion is met, called the "predicate") and then using that variable where we were using the repeated function code.

```javascript=
const getSomeData = async (url) => {
    console.log("About to fetch the data from " + url);
    const result = await fetch(url);
    console.log("Fetching the data")
    const data = await result.json();
    console.log("Got the data, here it is");
    
    console.log(data);
    return data;
}

const isFrom2004 = (movie) => {
    return movie.Year === "2004";
}


const findSomeMovies = async () => {
    const result = await getSomeData("http://www.omdbapi.com/?s=mean girls&apikey=");
    const movies = result.Search;
    const moviesFrom2004 = movies.filter(isFrom2004);
    
    console.log(moviesFrom2004);
    
    const aMovieFrom2004 = movies.find(isFrom2004);
    
    console.log(aMovieFrom2004);
}

console.log("About to call the async function");
findSomeMovies();
console.log("Do other useful stuff");

```

## Try it!

Okay, your exercise is to search for "Starship Troopers" from the API we used last week and only output the 1988 anime. "Nuke 'em Rico!".
