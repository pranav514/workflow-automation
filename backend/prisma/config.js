"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD = exports.SERVER_USER = exports.SERVER_PORT = exports.SERVER_HOST = exports.JWT_SECRET = exports.redisClient = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("redis");
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
exports.redisClient = (0, redis_1.createClient)();
exports.JWT_SECRET = process.env.JWT_SECRET || "secret123456";
exports.SERVER_HOST = process.env.HOST;
exports.SERVER_PORT = process.env.PORT || "456";
exports.SERVER_USER = process.env.USER;
exports.PASSWORD = process.env.PASS;
