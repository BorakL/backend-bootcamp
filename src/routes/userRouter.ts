import express from 'express';
import { createUser, deleteUser, getAllUser, getUser, updateUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter
    .route("/")
    .get(getAllUser)
    .post(createUser)

userRouter
    .route("/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

export default userRouter;