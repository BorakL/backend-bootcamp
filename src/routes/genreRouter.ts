import express from 'express';
import { createGenre, deleteGenre, getAllGenres, getGenre, updateGenre } from '../controllers/genreController';

const genreRouter = express.Router();

genreRouter
    .route("/")
    .get(getAllGenres)
    .post(createGenre)

genreRouter
    .route("/:id")
    .get(getGenre)
    .patch(updateGenre)
    .delete(deleteGenre)

export default genreRouter