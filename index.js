import express from "express";
import dotenv from "dotenv";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app)
const io = new Server(server);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

// socket code

io.on("connection",(socket)=>{
    socket.emit("connection",{
        "name" : "naya connection aya hai guru"
    })

    socket.on("send-location",(data)=>{
        // console.log("location recived ", data); 
        socket.broadcast.emit("receive-location", {
            id: socket.id,
            location: data,
        });
        // socket.emit("receive-location", {
        //     id: socket.id,
        //     location: data,
        // });
    })
})

app.get("/",(req,res) => {
    res.render("map",{API_KEY : process.env.API_KEY})    
})




server.listen(port,()=>{
    console.log("Server is running on port",port);
})