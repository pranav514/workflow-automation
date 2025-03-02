import express from "express"
import cors from "cors"
import userRoute from "./routes/userRoute";
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/v1/user' , userRoute)
app.listen(3001 , () => {
    console.log("server of primary backend started on port 3001")
})