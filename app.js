
import express  from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUIST_NUMBER, REQUIST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";
import router from "./routes/api.js";


const app = express();

//App use Default Middleware

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({urlencoded: URL_ENCODE}));
app.use(helmet());
app.use(cookieParser());

// App use limiter

const limiter = rateLimit({windowMs: REQUIST_TIME, max: REQUIST_NUMBER});
app.use(limiter);

// Cache 

app.set('etag', WEB_CACHE)

// Database Connect

mongoose.connect(DATABASE, {autoIndex: true}).then(() => {
    console.log("MongoDB Connected");
}).catch(() =>{
    console.log("MongoDB Disconnected");
})

// Routes

app.use("api/v1", router)

// app listen

app.listen(PORT, () => {
    console.log("Server Running on " + PORT);
})