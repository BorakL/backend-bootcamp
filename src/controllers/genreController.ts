import { Request, Response } from "express";
import Genre from "../models/genreModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const getAllGenres = getAll(Genre)

export const getGenre = getOne(Genre)

export const createGenre = createOne(Genre)

export const updateGenre = updateOne(Genre)

export const deleteGenre = deleteOne(Genre)