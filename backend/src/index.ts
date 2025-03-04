import express from "express"
import cors from "cors"
import userRoute from "./routes/userRoute";
import actionRoute from "./routes/actionRoute";
import triggerRoute from "./routes/triggerRoute";
import { redisClient } from "./config";
import zapRoute from "./routes/zapRoute";
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/v1/user' , userRoute)
app.use('/api/v1/action' , actionRoute)
app.use('/api/v1/trigger' ,triggerRoute)
app.use('/api/v1/zap' , zapRoute)
app.listen(3001 , async() => {
    await redisClient.connect();
    console.log("server of primary backend started on port 3001")
})