import express from 'express';
import { createGenre, getAllGenres, getGenre } from '../controllers/genreController';

const genreRouter = express.Router();

genreRouter
    .route("/")
    .get(getAllGenres)
    .post(createGenre)

genreRouter
    .route("/:genreId")
    .get(getGenre)

export default genreRouter