import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

export const signin = async(req,res,next)=>{
  const {email, password} =req.body
  if(!email || !password || email==='' || password==="")
  {
    next(errorHandler(400,"All fields are required"))
  }

  try {
    const user = await User.findOne({email})
    
      if(!user){
       return  next(errorHandler(400,'Invalid username or password'))
      }
      const validPassword = bcryptjs.compareSync(password,user.password)
      if(!validPassword){
        return next(errorHandler(400,'Invalid password'))
      } 

      const token = jwt.sign(
        {id:user._id}, process.env.JWT_SECRET,
        
      )

      const {password: pass, ...rest}= user._doc;
      
      res.status(200).cookie('access_token',token,
      {httpOnly:true}).json(user._doc)

      
    }catch (error){
      next(error)
  } 
  }
