import type {NextApiResponse, NextApiRequest} from "next"
import prisma from "@/auth"

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {id} = req.query
    if(typeof(id) !== "string") return res.status(400).send("invalid ID");
    try{
        const product = await prisma.user.findUnique({
            where:{id},
            select: {image:true}
        })

        if(!product || !product.image){
            return res.status(404).send("Image not found")
        }

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(product.image)
    }catch{
        res.status(500).send("Internal Server Eror")
    }
}