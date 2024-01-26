import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
export const signup = async (req,res,next)=>{
 const {username, email, password} = req.body;

 if(!username || !email || !password
  || username==='' || email===''|| password===''){
 next(errorHandler(400,'All fields are required')) }
 const hashedPassword = bcryptjs.hashSync(password,10)
 
 try {
  const newUser = User.create({
    username,
    email,
    password:hashedPassword,
   })
  
 } catch (error) {
   next(error)
 }
 

 res.json({message:'Signup successful'})
}