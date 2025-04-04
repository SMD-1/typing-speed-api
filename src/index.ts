import "dotenv/config";
import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { user } from "./db/schema";
import cors from "cors";
import { db } from "./db";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await db.select().from(user);
  res.json(users);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
