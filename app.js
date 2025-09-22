import express from "express";
import config from "config";
import sequelize from "./config/db.js";
import mainRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import errorHandling from "./middlewares/errors/error-handling.js";

const PORT = config.get("port") ?? 3333;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", mainRouter);

app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
