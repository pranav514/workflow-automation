import express from "express"
import { prisma } from "../config";
const router = express.Router()
router.post("/:userId/:zapId" , async(req , res) => {
    try{
        const zapId = req.params.zapId
        const metadata = req.body;
        await prisma.$transaction(async tx => {
            const zapRun = await tx.zapRun.create({
                data : {
                    zapId,
                    metadata
                }
            })
            await tx.zapRunOutbox.create({
                data  : {
                    zapRunId : zapRun.id
                }
            })
        })
        res.status(200).json("webhook recived and transcation completed");
    }catch(error){
        res.status(411).json("something gone wrong either during the transaction or while reciveing the webhook");
    }

    

})
export default router

// https://hooks.zapier.com/hooks/catch/21905232/2gv08jq/