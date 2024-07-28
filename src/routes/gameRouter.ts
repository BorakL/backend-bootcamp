import express from 'express';
import { createGame, getAllGames, getGame } from '../controllers/gameController';

const gameRouter = express.Router();

gameRouter
    .route("/")
    .get(getAllGames)
    .post(createGame)

gameRouter
    .route("/:gameId")
    .get(getGame)


export default gameRouter;