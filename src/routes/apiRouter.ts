import { Router } from "express";

const personRouter = Router();

personRouter
    .route("/")
    .get()