import express from "express";
import morgan from "morgan";
import morrgan from "morgan"


const app = express();
app.use(morgan('dev'))

export default app;
