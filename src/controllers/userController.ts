import User from "../models/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const getUser = getOne(User)

export const getAllUser = getAll(User);

export const createUser = createOne(User);

export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);