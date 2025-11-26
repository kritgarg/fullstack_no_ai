import { Router } from "express";
import { prisma } from "../../config/db.js"
const router = Router()

router.post("/create",async(req,res)=>{

    const {name,dob,dod} = req.body

    if (!name){
        return res.status(401).json({"message":"name connot be empty"})
    }

    try{
        const user = await prisma.author.create({
            data:{
                fullname:name,
                date_of_birth:dob,
                date_of_death:dod
            }
        })

        return res.status(200).json(user,{"message":"author created succeesfully"})
    }catch(err){
        console.log(err)
    }
})

export default router