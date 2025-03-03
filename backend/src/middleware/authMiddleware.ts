import { NextFunction  , Request , Response} from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";


declare global {
    namespace Express{
        interface Request{
            userId : string;
        }
    }
}

export const authMiddleware = async(req  : Request  , res : Response , next : NextFunction) : Promise<any> => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "not authorized, no token provided"
            });
        }
        const decodedToken = verify(token, JWT_SECRET) as JwtPayload
        if(!decodedToken){
           return res.status(401).json({
                error: "could not authenticate",
              });
        }
        req.userId = decodedToken.id;
        next();
    }catch(error){
        res.status(400).json({
            error: "error ocurred  in authentication",
          });
    }
}