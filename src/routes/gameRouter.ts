import express from 'express';
import { createGame, deleteGame, getAllGames, getGame, updateGame } from '../controllers/gameController';

const gameRouter = express.Router();

gameRouter
    .route("/")
    .get(getAllGames)
    .post(createGame)

gameRouter
    .route("/:id")
    .get(getGame)
    .patch(updateGame)
    .delete(deleteGame)


export default gameRouter;