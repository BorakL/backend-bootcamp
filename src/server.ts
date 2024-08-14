import express, { NextFunction, Request, Response, Express, ErrorRequestHandler} from 'express' 
import dotenv from 'dotenv'
import gameRouter from './routes/gameRouter';
import genreRouter from './routes/genreRouter';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import orderRouter from './routes/orderRouter';
import session from 'express-session';
import reviewRouter from './routes/reviewRoutes';

dotenv.config();

const app:Express = express();

app.use(express.json())

app.use(
    session({
        secret:"anson the dev",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        }
    })
)

app.use("/api/v1/games", gameRouter)
app.use("/api/v1/genres", genreRouter) 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/reviews", reviewRouter)

app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
    res.status(404).json({
        status:'fail123',
        message: err
    })
})

const connectDB = async()=>{
    try{
        const uri = process.env.MONGO_URI;
        if(!uri){
            throw new Error("MONGO_URI is not defined in the environment variables")
        }
        const conn = await mongoose.connect(uri);
        console.log("Database connected successfully: ", conn.connection.host)
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on the port ${port}`)
})