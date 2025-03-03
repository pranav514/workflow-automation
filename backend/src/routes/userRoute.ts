import express, { Request, Response } from "express"
import { JWT_SECRET, prisma } from "../config";
import { comparePassword, hashPassword } from "../utils/authentication";
import { signInSchema, signUpSchema } from "../types/schemaValidation";
import { sign } from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.post('/signup' , async(req , res) : Promise<any> => {
    try{
        const parsedData = signUpSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(422).json({
                message : "wrong input"
            })
        }
        if(!parsedData.data?.name || !parsedData.data.email || !parsedData.data.password){
            return res.status(400).json({
                message : "name  , email or password is missing"
            })
        }
        const secruePassowrd = hashPassword(parsedData.data.password);
        const user = await prisma.user.create({
            data : {
                name : parsedData.data.name,
                email :parsedData.data.email,
                password :secruePassowrd
            }
        })
        return res.status(200).json({
            messagge : "account created successfully",
            user
        })
    }catch(error){
        return res.status(500).json({
            error : "something went wrong while createting the message"
        })
    }
    
})

router.post('/signin' , async(req , res) : Promise<any> => {
    try{
        const parsedData = signInSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(422).json({
                message : 'wrong input'
            })
        }
        if(!parsedData.data.email || !parsedData.data.password){
            return res.status(400).json({
                message : 'email , password is missing'
            })
        }
        const user = await prisma.user.findFirst({
            where : {
                email  : parsedData.data.email
            }
        })
        if(!user){
            return res.status(401).json({
                message : "user not found , not authorized",
            })
        }
        const hasedPassword = user.password;
        if(!comparePassword({ password: parsedData.data.password, hashedPassword: hasedPassword })){
            return res.status(401).json({
                message : "enter correct password , not authorized"
            })
        }

        const token = sign({id : user.id} , JWT_SECRET)
        return res.status(201).json({
            message : "login succesfull",
            user,
            token
        })
    }catch(error){
        return res.status(500).json({
            message : "some went wrong during the signin"
        })
    }
})

router.get('/getuser', authMiddleware, async (req: Request, res: Response) :Promise<any>  => {
    try{
        const userId = req.userId;
        if(!userId){
            return res.status(404).json({
                message : "you are not authorized  , cannot get the userId"
            })
        }
        const user = await prisma.user.findFirst({
            where : {
                id : userId
            },
            select : {
                name  : true,
                email : true,
            }
        })
        return res.status(200).json({
            message  : "fetched user sucessfully",
            user
        })
    }catch(error){
        return res.status(500).json({
            error : "something went wrong while fetching the user"
        })
    }
})



export default router