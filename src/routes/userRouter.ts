import express from "express";
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter
    .route("/")
    .get(getAllUsers)
    .post(addUser)

userRouter
    .route("/:userId")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

export default userRouter