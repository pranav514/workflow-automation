import express from "express"
import { prisma, redisClient } from "../config";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();
router.get('/availabletrigger' ,authMiddleware, async(req , res) : Promise<any> => {
    try{
        const triggers = await redisClient.get("availabletriggers");
        if(triggers){
            return res.status(200).json({
                message : "available trigger fetched from cache succesfully",
                trigger : JSON.parse(triggers)
            })
        }
        const trigger = await prisma.availableTrigger.findMany({});
        await redisClient.set("availabletriggers",JSON.stringify(trigger) , {
            EX : 1440
        })
    return res.status(200).json({
        message : "available trigger fetched succesfully",
        trigger
    })

    }
    catch(error){
        res.status(500).json({
            error : "error occured while fetching the available trigger"
        })
    }
    })

export default router;