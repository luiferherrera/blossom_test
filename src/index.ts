import express from "express";
import rateLimit from "express-rate-limit";
import { FranchiseController } from "./infrastructure/adapters/in/Controller";
import { InMemoryLogAdapter } from "./infrastructure/adapters/out/InMemoryLogAdapter";

const app = express();
const logger = new InMemoryLogAdapter();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, 
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

app.use(express.json());
app.use(limiter);

app.use("/", FranchiseController(logger));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});