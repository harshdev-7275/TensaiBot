import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";



const port = process.env.PORT || 8000;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/health", (req, res) => {
    res.send("Server is running");
})
app.use(cors());

app.use("/auth",authRoutes);
app.use(errorHandler);








app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})