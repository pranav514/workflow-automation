import express from "express"
import { ZapCreateSchema } from "../types/schemaValidation"
import { prisma } from "../config";
import { authMiddleware } from "../middleware/authMiddleware";
import { promise } from "zod";
import { sendMail } from "../utils/mail";
const router = express.Router()
    router.post('/createzap' , authMiddleware,async(req , res) : Promise<any> => {
        const userId = req.userId
           const user  = await prisma.user.findFirst({
                where : { 
                    id : userId
                }
           })
           if(!user?.isverified){
            return res.status(401).json({
                message : "email not verified yet  , pls verify the email",
                user
            })
           } 
           const email = user.email
           const name = user.name
        try{
            
            const parsedData = ZapCreateSchema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(422).json({
                    message : "wrong input",
                })
            }
            const zapId : String = await prisma.$transaction(async tx => {
                const zap = await prisma.zap.create({
                    data : {
                        userId : userId,
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
                        metadata : parsedData.data.triggerMetadata,
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
                return zap.id
        })
        console.log(zapId)
        const body = `hi ${name} , your zap is created sucessfully`
        sendMail(email , body)
        return res.status(200).json({
            message : "zap created succesfully",
            zapId
            
        })
        }
        catch(error){
            const error_body = `error occured while creating the zap try again after some`
            sendMail(email , error_body)
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

router.get('/:zapId' , authMiddleware , async(req , res) : Promise<any> => {
    try{
        const zapId = req.params.zapId;
    const userId = req.userId;
    const zap = await prisma.zap.findFirst({
        where : {
            id : zapId,
            userId : userId
        },
        select : {
            trigger : {
                select : {
                    type : true
                }
            },
            actions : {
                select : {
                    type : true
                }
            }
        }
    })
    if(!zap){
        return res.status(404).json({
            message : "zap does not exist"
        })
    }
    return res.status(200).json({
        message : "zap fetched succesfully",
        zap
    })
    }catch(error){
        return res.status(500).json({
            message : "error occured while fetching the zap"
        })
    }

    
    

})

router.delete('/delete/:zapId' ,authMiddleware , async(req  , res) : Promise<any>  => {
    try{
        const zapId = req.params.zapId;
        const userId = req.userId;
        console.log(zapId)
        console.log(userId)
        const deletezap = await prisma.zap.delete({
            where : {
                id : zapId,
                userId : userId
            }
        })
        return res.status(200).json({
            message : "deleted zap succesfully",
            deletezap
        })
    }catch(error){
        res.status(400).json({
            message : "error while deleting the zap",
            error
        })
    }
})

    router.put('/update/trigger/:zapId' , authMiddleware , async(req ,res) : Promise<any> => { 
        try{
            const id = req.params.zapId;
        const userId = req.userId
        const {triggerMetaData , availabeTriggerId} = req.body
        const zap = await prisma.zap.findFirst({
            where : {
                id,
                userId,
            }
        })
        if(!zap){
            return res.status(404).json({
                message : "not authorized to update the zap"
            })
        }
        const zapUpdate = await prisma.trigger.update({
            where : {
                zapId : id
            },
            data : {
                availabeTriggerId : availabeTriggerId,
                metadata : triggerMetaData,
                
                
            }
        })
        return res.status(200).json({
            message : "trigger updated sucessfully",
            zapUpdate
        })

        }catch(error){
            res.status(500).json({
                message : "error while updating the trigger"
            })
        }

                
    })

   router.put('/update/action/:zapId/:actionId' , authMiddleware , async(req , res) : Promise<any> => {
    try{
        const {zapId , actionId} = req.params;
        const userId = req.userId;
        const {availabeActionId , metadata} = req.body;
        if(!availabeActionId && !metadata){
            return res.status(404).json({
                message : "cannot update without body",
            })
        }
        const zap = await prisma.zap.findFirst({
            where : {
                id : zapId,
                userId
            }
        })
        if (!zap) {
            return res.status(404).json({
                message: "Zap not found or unauthorized to update.",
            });
        }
        const action = await prisma.action.findFirst({
            where: { id: actionId, zapId },
        });

        if (!action) {
            return res.status(404).json({
                message: "Action not found for this zap.",
            });
        }
        const updatedAction = await prisma.action.update({
            where: { id: action.id },
            data: { availabeActionId , metadata },
        });

        return res.status(200).json({
            message: "Action updated successfully.",
            updatedAction,
        });
    }catch(error){
        console.error("Error updating action:", error);
        return res.status(500).json({
            message: "Error while updating the action.",
        });
    }
        



   })
    
    
 
export default router