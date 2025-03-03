import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import { createClient} from "redis"
dotenv.config();
export const prisma = new PrismaClient();
export const redisClient = createClient();
export const JWT_SECRET  = process.env.JWT_SECRET || "secret123456"

