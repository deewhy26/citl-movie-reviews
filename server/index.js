import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"
//initiate middleware
const app = express() 
//handle cors
app.use(cors())
//specify express to use only json parsing
app.use(express.json())
//listen to url encoded requests for post- dont allow nested jsons- parse simple json into flat object
app.use(express.urlencoded({extended: false}))
//for parsing cookies from the http messages
app.use(cookieParser())
//initialising server and binding requests to express app for service
const server = http.createServer(app)
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URI).then(() => { 
    console.log("Mongodb connected! ")
    server.listen(port, () => { 
        console.log(`Server is listening at port ${port}`); 
    });
}).catch((err) => { 
    console.log({err});
    process.exit(1); 
});

