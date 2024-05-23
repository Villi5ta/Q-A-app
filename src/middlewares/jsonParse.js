import express, { json } from "express";
const app = express();

app.use(json());

import questionRoutes from "./routes/question";
app.use("/api", questionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
