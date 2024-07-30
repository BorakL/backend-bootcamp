import { Request, Response } from "express"
import Game from "../models/gameModel"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory"

export const getAllGames = getAll(Game)

export const getGame = getOne(Game)

export const createGame = createOne(Game)

export const updateGame = updateOne(Game)

export const deleteGame = deleteOne(Game)