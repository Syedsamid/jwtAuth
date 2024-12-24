import express from "express";
import config from "config";
import userRouter from "./controllers/users/index.js";
import "./utils/dbConnect.js"

const app = express();
const PORT = config.get("PORT");

app.use (express.json());

app.get("/sam",(req,res)=>{
    try{
        res.status(200).json({msg:"hello"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:error})
    }
})
app.use("/api/users",userRouter)

app.listen(PORT,()=>{
    console.log(`Server is runnig ${PORT}`)
})

