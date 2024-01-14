 
 const User=require('../model/userModel')
 const jwt = require('jsonwebtoken')

 const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
 }

 const postLogin = async (req,res)=>{

const { email,password } = req.body


try {
        
    const user = await User.login(email,password)

    const token = createToken(user._id)

    res.status(200).json({ email,token})

    } catch (error) {

        res.status(404).json({error:error.message})
    }


}

const postSignup=async (req,res) => {

    const { name,sex,city,location,PhoneNumber,homeNumber,privilege,username,email, password}=req.body

    try {
 
 
        
    const user = await User.signup(name,sex,city,location,PhoneNumber,homeNumber,privilege,username,email,password)


    const token = createToken(user._id)
    
    res.status(200).json({ name,sex,city,location,PhoneNumber,homeNumber,privilege,username,email,token})

    } catch (error) {

        res.status(404).json({error:error.message})
    } 

}

module.exports={postLogin,postSignup}
