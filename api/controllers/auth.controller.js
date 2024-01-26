import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async (req,res)=>{
 const {username, email, password} = req.body;

 if(!username || !email || !password
  || username==='' || email===''|| password===''){
  return res.status(400).json({message:"All fields are required"})
 }
 const hashedPassword = bcryptjs.hashSync(password,10)
 
 try {
  const newUser = User.create({
    username,
    email,
    password:hashedPassword,
   })
  
 } catch (error) {
  res.status(500).json(error)
 }
 

 res.json({message:'Signup successful'})
}