import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import RestaurantRoute from './routes/restaurant.route'
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";
import axios from "axios";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", RestaurantRoute)
app.use("/api/v1/menu", menuRoute);

app.listen(PORT, () => {
  console.log(`Serer listen at ${PORT}`);
  connectDB();
});

axios.defaults.withCredentials = true;
