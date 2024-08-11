import express from 'express';
import { createGame, deleteGame, getAllGames, getGame, updateGame } from '../controllers/gameController';
import reviewRouter from './reviewRoutes';

const gameRouter = express.Router();

gameRouter.use("/:gameId/reviews", reviewRouter)

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