/**
 *   @author Johnson, Anne (johnson.anne07@gmail.com)
 *   @version 0.0.0
 *   @summary Movie Rating with Arrays Project 3|| created: 10.26.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');


let movies = [];
let avgRating, whichTask, whichMovie;

function main() {
    process.stdout.write(`\x1Bc`);
    const RATE_MOVIE = 0;
    let infinite = 0;
    while (infinite < 1) {
        if (movies.length > 0) {
            setWhichTask();
            if (whichTask === RATE_MOVIE) {
                populateMovies();
            } else {
                setWhichMovie();
                setAvgRating();
                displayAvgRating();
            }
        } else {
            populateMovies();
        } printArray();
    }
}

main();

function setWhichTask() {
    whichTask = -1;
    const RATE = 0, VIEW = 1;
    while (whichTask === null || whichTask !== RATE && whichTask !== VIEW) {
        whichTask = Number(PROMPT.question(`\nWould you like to rate a movie or view an average movie rating? [0 is rate, 1 is view]: `));
    }
}

function displayMovieTitles() {
    for (let i = 0; i < movies.length; i++) {
        console.log(`\n ${i} = ${movies[i][0]}`);
    }
}

function populateMovies() {
    const COLUMNS = 4, TITLE = 0, RATING = 1, TOTAL_RATING = 2, COUNTER = 3, MAX_STARS = 5;
    let movieChoice, newTitle;
    if (movies.length !== 0) {
        for (let i = 0; i < movies.length; i++) {
            console.log(`${i} = ${movies[i][0]}`);
            newTitle = i + 1;
        }
        while (movieChoice === null || isNaN(movieChoice) || movieChoice < TITLE) {
            movieChoice = Number(PROMPT.question(`\nPlease enter movies number, or ${newTitle} to enter a new title:  `));
        }
        if (movieChoice !== newTitle) {
            movies[movieChoice][RATING] = -1;
            while (isNaN(movies[movieChoice][RATING]) || movies[movieChoice][RATING] < 1 || movies[movieChoice][RATING] > 5) {
                movies[movieChoice][RATING] = Number(PROMPT.question(`\nPlease rate the movie [1 is bad, 5 is good] `));
            }
            movies[movieChoice][TOTAL_RATING] = movies[movieChoice][TOTAL_RATING] + movies[movieChoice][RATING];
            movies[movieChoice][COUNTER] = movies[movieChoice][COUNTER] + 1;
        } else {
            movies[newTitle] = [];
            for (let i = 0; i < COLUMNS; i++) {
                if (i === TITLE) {
                    while (movies[newTitle][i] == null || !/[a-zA-Z0-9 ]{1,30}/.test(movies[newTitle][i])) {
                        movies[newTitle][i] = PROMPT.question(`\nPlease enter a movie title: `);
                    }
                } else if (i === RATING) {
                    while (typeof movies[newTitle][i] == null || isNaN(movies[newTitle][i]) || movies[newTitle][i] < 1 || movies[newTitle][i] > 5) {
                        movies[newTitle][i] = Number(PROMPT.question(`\nPlease enter a rating [1 is bad, 5 is good]: `));
                    }
                } else if (i === TOTAL_RATING) {
                    movies[newTitle][i] = movies[newTitle][RATING];
                } else {
                    movies[newTitle][i] = 1;
                }
            }
        }
    } else {
        movies[0] = [];
        for (let i = 0; i < COLUMNS; i++) {
            if (i === TITLE) {
                movies[0][i] = PROMPT.question(`\nPlease enter a movie title: `);
            } else if (i === RATING) {
                movies[0][i] = PROMPT.question(`\nPlease rate the movie, 1-5, 1 being awful, 5 is amazing: `);
            } else if (i === TOTAL_RATING) {
                movies[0][i] = movies[0][RATING];
            } else {
                movies[0][i] = 1;
            }
        }
    }
}

function setWhichMovie() {
    for (let i = 0; i < movies.length; i++) {
        console.log(`\n ${i} = ${movies[i][0]}`);
    }
    whichMovie = Number(PROMPT.question(`Which movie's rating would you like to see? `));
}

function setAvgRating() {
    avgRating = Number(movies[whichMovie][2] / movies[whichMovie][3]);
}

function displayAvgRating() {
    process.stdout.write(`\x1Bc`);
    console.log(`\n The average movie rating for ${movies[whichMovie][0]} is ${avgRating} stars. `);
}