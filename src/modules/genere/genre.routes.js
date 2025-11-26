import { Router } from "express";
import { prisma } from "../../config/db.js"
const router = Router()

router.post("/create",async (req,res)=>{
    const {name,id}= req.body

    if (!name){
        return res.status(401).json({"message":"please enter a genre"})
    }

    if (id){
    const alreadygenre = await prisma.genre.findUnique({
        where:{
            id:id
        }
    })

    if (alreadygenre){
        return res.status(401).json({"message":"genre already exists , try something new"})
    }
    }



    try{
        const newgenre = await prisma.genre.create({
            data:{
                name:name
            }
        })

    return res.status(201).json({"message":"created",newgenre},)
    }catch(err){
        console.log(err)
        return ;
    }

})



    router.get("/all",async(req,res)=>{
        try{
            const allgenres = await prisma.genre.findMany()

            return res.status(200).json({allgenres})
        }catch(err){
            console.log(err)
            return 
        }
    })



    router.get("/:id",async(req,res)=>{

        const {id}= req.params
        const numid= Number(id)
        
        if (!id){
            return res.status(400).json({"message":"please enter a genre"})
        }

        
        try {
            const findgenre = await prisma.genre.findUnique({
                where:{
                    id:numid
                }
            })

            if(!findgenre){
                return res.status(401).json({"message":"genre not found"})
            }

            return res.status(200).json({findgenre})
        }catch(err){
            console.log(err)
            return
        }
    })


    router.patch("/update/:id",async(req,res)=>{
        const {id}= req.params
        const {name}= req.body
        const numid = Number(id)

        if (!id){
            return res.status(400).json({"message":"please enter a genre"})
        }
        try{
            const updated = await prisma.genre.update({
                where:{
                    id:numid
                },
                data:{
                    name:name
                }
            })

            return res.status(202).json(updated)
        }catch(err){
            console.log(err)
        }
    })




export default router