import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import booksRouter from "./routes/books";
import userRouter from "./routes/users";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", userRouter);
app.use("/booksapi", booksRouter);

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

export default app;
