# Final project

You already know how to search for movies, and now you know how to allow someone
to enter their search query. Now build a tool that:

-   lets someone enter the name of a movie into a search field
-   when they click the search button, use the OMDB API to search for movies
    that match that title
-   display the results as a gallery or list
-   lets the user click on a result to see more details about that movie

Go to [OMDB](http://www.omdbapi.com/) and sign up for your own API key Import
the OMDB API key from a file `credentials.js`, which looks something like this:

```javascript=
export const OMDB_API_KEY = "xxxx";
```

Make sure you don't commit this into your git repo by adding it to your
`.gitignore` file.
