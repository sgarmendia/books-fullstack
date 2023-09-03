import { Router } from "express";
import {
	getBooks,
	getBooksById,
	upsertBook,
	deleteBookById,
} from "../controllers/books";

const router = Router();

router.get("/books", getBooks);
router.get("/book/:id", getBooksById);
router.put("/book", upsertBook);
router.delete("/book/:id", deleteBookById);

export default router;
