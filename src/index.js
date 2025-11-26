import express from "express"
import Env from "./config/env.js"
import authorRoutes from "./modules/author/author.routes.js"
import genreRoutes from "./modules/genere/genre.routes.js"

const app = express()
const Port = Env.Port

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello sevrer running")
})

app.use("/api/authors",authorRoutes)
app.use("/api/genres",genreRoutes)

app.listen(Port,()=>{
    console.log(`server started on Port ${Port}`)
})