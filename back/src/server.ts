import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost/simpleapi");

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Server is listening"));
