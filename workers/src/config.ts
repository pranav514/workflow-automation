import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
export const prisma = new PrismaClient();

export const SERVER_HOST = process.env.HOST;
export const SERVER_PORT = process.env.PORT || "456";
export const SERVER_USER = process.env.USER;
export const PASSWORD = process.env.PASS;
export const KAFKA_BROKER = process.env.KAFKA_BROKER || 0;