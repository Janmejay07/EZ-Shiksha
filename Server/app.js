import express from "express";
import userRouter from "./routes/user.js";
import documentRouter from "./routes/documents.js";
import aiRouter from "./routes/ai.js";
import studyRouter from "./routes/study.js";
// import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/documents", documentRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/study", studyRouter);
// app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working lil");
});

// Using Error Middleware
app.use(errorMiddleware);
