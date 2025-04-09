import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import dbconnection from './database/mongodb.js';
import userRoute from './Routes/userRoutes.js';
import selectinvestorRouter from './Routes/homeinvestorRoutes.js';
import cookieParser from "cookie-parser";
import createpostRouter from './Routes/postRoutes.js';
import { createServer } from "http";
import { Server } from "socket.io";
import inviteInvestorRoute from './Routes/inviteInvestorRoute.js';
import sendMaterialRoute from './Routes/sendMaterialRoutes.js';

dbconnection()
    .then((res) => {
        console.log("db connected");
        // console.log(res);  

    })
    .catch((err) => {
        console.log("error", err);

    })

// Initialize Express app
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from this origin (your frontend)
    credentials: true,  // Allow credentials such as cookies, authorization headers
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(bodyParser())

// Other middlewares
app.use(express.json());
app.use('/assets/profiles', express.static('assets/profiles'));
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/user", userRoute);
app.use("/investor", selectinvestorRouter);
app.use("/", inviteInvestorRoute);
app.use("/", createpostRouter);
app.use("/",sendMaterialRoute);
app.listen(process.env.port, function () {
    console.log("app started");

});

// Handle Socket.io Connections
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
