import express from "express"
import { prisma, redisClient } from "../config";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();
router.get('/availableaction' ,authMiddleware,async (req , res) : Promise<any> => {
    try{
        const actions = await redisClient.get("availableactions")
        if(actions){
            return res.status(200).json({
                message : "fetched available action from cache succesfully",
                availableaction : JSON.parse(actions)
            })
        }
        const availableaction = await prisma.availableAction.findMany({})
        await redisClient.set("availableactions" , JSON.stringify(availableaction) , {
            EX : 14 // invalidate the cache after every four hour
        })
        return res.status(200).json({
            message : "fetched available action succesfully",
            availableaction
        })
}catch(error){
    res.status(500).json({
        error : "something went wrong",
    })
}
   
})

export default router