import express from "express"
import { ZapCreateSchema } from "../types/schemaValidation"
import { prisma } from "../config";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router()
router.post('/createzap' , authMiddleware,async(req , res) : Promise<any> => {
    try{
        const userId = req.userId
        const parsedData = ZapCreateSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(422).json({
                message : "wrong input",
            })
        }
        const zapId = await prisma.$transaction(async tx => {
            const zap = await prisma.zap.create({
                data : {
                    userId : req.userId,
                    triggerId : "",
                    actions : {
                        create : parsedData.data.actions.map((x , index) => ({
                            availabeActionId : x.availableActionId,
                            sortingOrder : index,
                            metadata : x.actionMetadata

                        }))
                    }
                }
            })
            const trigger = await tx.trigger.create({
                data : {
                    availabeTriggerId : parsedData.data.triggerId,
                    zapId : zap.id
                }
            })
            await tx.zap.update({
                where : {
                    id : zap.id
                },
                data : {
                    triggerId : trigger.id
                }
            })
    })
    return res.status(200).json({
        message : "zap created succesfully",
        zapId
    })
    }
    catch(error){
        return res.status(500).json({
            message  : "error ocurred while creating the zap"
        })
    }
})


router.get('/userzap' , authMiddleware , async(req , res) : Promise<any> => {
    const id = req.userId;
    try{
        const zaps = await prisma.zap.findMany({
            where : {
                userId : id
            },
            select : {
                trigger : {
                    select : {
                        type : true
                    }
                },
                actions : {
                    select : {
                        type  : true
                    }

                }
            }
        })
        res.status(200).json({
            message : "zap fetched succesfully",
            zaps
        })
    }catch(error){
        return res.status(500).json({
            error : "error while fetching the zaps of the user",
        })
    }
})
export default router