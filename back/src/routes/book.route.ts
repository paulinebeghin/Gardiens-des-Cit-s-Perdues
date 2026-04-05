import express from "express";
import * as bookController from "../controllers/book.controller"

const bookRouter: express.Router = express.Router();

bookRouter.get("/", bookController.getAll);
bookRouter.get("/:id", bookController.getById);
bookRouter.post("/", bookController.create);
bookRouter.patch("/:id", bookController.update);
bookRouter.delete("/:id", bookController.remove);

export default bookRouter;