import {z} from "zod"

export const signUpSchema = z.object({
    name : z.string().min(3),
    email : z.string().min(5),
    password : z.string().min(6)

})

export const signInSchema = z.object({
    email  : z.string().min(5),
    password : z.string().min(6)
})


export const ZapCreateSchema = z.object({
    triggerId : z.string(),
    triggerMetadata : z.record(z.any()).optional(),
    actions : z.array(z.object({
        availableActionId : z.string(),
        actionMetadata : z.record(z.any()).optional()
    }))
})

