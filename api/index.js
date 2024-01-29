import { log } from 'console';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(
  {useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true}).then(()=>{
console.log(`successfully connected`);
}).catch((e)=>{
console.log(`not connected`);
})

const app = express();
app.use(cors());
app.use(express.json())

app.listen(3000,()=>{
  console.log('server, is running on port 300')
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success:false,
    statusCode,
    message

  })
})


