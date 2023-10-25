import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import mongoose from "mongoose"
import "dotenv/Config"
//initiate middleware
const app = express() 
//handle cors
app.use(cors())
//specify express to use only json parsing
app.use(express.json())
//listen to url encoded requests for post- dont allow nested jsons- parse simple json into flat object
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

const port= process.env.PORT || 5000
const server= http.createServer(app)
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB connected")
    server.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })
}).catch((err)=>{
    console.log({err})
    process.exit(1);
});
