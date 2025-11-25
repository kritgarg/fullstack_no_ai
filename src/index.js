import express from "express"
import Env from "./config/env.js"

const app = express()
const Port = Env.Port

app.get("/",(req,res)=>{
    res.send("hello sevrer running")
})

app.listen(Port,()=>{
    console.log(`server started on Port ${Port}`)
})