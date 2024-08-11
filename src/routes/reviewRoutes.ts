import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getOneReview, setGameUser, updateReview } from "../controllers/reviewController";

const reviewRouter = Router({mergeParams:true});

    reviewRouter
    .route("/")
    .get(setGameUser,getAllReviews)
    .post(createReview)

    reviewRouter
    .route("/:id")
    .get(getOneReview)
    .patch(updateReview)
    .delete(deleteReview)

export default reviewRouter;