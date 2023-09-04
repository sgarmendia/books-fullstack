import { Router } from "express";
import {
	getBooks,
	getBooksById,
	upsertBook,
	deleteBookById,
} from "../controllers/books";
import { verifyJWT } from "../middlewares/verifySession";

const router = Router();

router.get("/books", getBooks);
router.get("/book/:id", getBooksById);
router.put("/book", verifyJWT, upsertBook);
router.delete("/book/:id", verifyJWT, deleteBookById);

export default router;
