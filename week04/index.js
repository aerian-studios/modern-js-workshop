import bricks from "bricks.js";
import { findSomeMoviePosters } from "./movieData";

const addPosterBricks = async () => {
    const moviePosters = await findSomeMoviePosters("pirate");

    document.body.innerHTML = moviePosters.join("");

    const inst = bricks({
        container: "body",
        packed: "data-packed",
        sizes: [
            { columns: 2, gutter: 10 },
            { mq: "768px", columns: 3, gutter: 25 },
            { mq: "1024px", columns: 4, gutter: 50 },
        ],
    });

    inst.pack();
};

addPosterBricks();
