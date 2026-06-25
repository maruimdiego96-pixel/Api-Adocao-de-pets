import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import petsRoutes from "./routes/petsRoutes.js";
// import adoptionsRoutes from "./routes/adoptionsRoutes.js";

// import notFound from "./middlewares/notFound.js";
// import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "O Adopt a Pet está funcionando" });
});

app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/pets", petsRoutes);
// app.use("/adoptions", adoptionsRoutes);


// app.use(notFound);
// app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar servidor:", error.message);
  }
};


startServer();