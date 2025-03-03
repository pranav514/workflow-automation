import express from "express"
import hookRoute from "./routes/hookRoute";
const app = express();
app.use(express.json());

app.use('/hooks/catch' , hookRoute)
app.listen(3000 , () => {
    console.log("server started at the localhost ")
})