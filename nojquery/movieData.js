// CREATE THIS
import { OMDB_API_KEY } from "./credentials";
import { getSomeData } from "./network";

export const hasAPoster = (movie) => movie.Poster !== "N/A";

export const getPoster = (movie) =>
    `<img src="${movie.Poster}" alt="${movie.Title}" />`;

export const findSomeMoviePosters = async (key = "star trek") => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?s=${key}&apikey=${OMDB_API_KEY}`
    );

    const posters = result.Search.filter(hasAPoster).map(getPoster);

    return posters;
};
