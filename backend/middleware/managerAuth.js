const jwt = require('jsonwebtoken')
const User = require('../model/managerModel')

const requireAuth =async (req,res,next) => {
    
    // varify authentication
    const { authorization } = req.headers

    if(!authorization) {
      return  res.status(404).json({error:'Autherization token required'})
    }

    //token ='Bearer fghmfkfkfj.gnfyfuvuyuvivuctycuxtrzzyjghcdgwtuzxcmmkm.ycucucjvjghfkbjsersrryghk '
 const token = authorization.split(' ')[1]
 
 try {
    const {_id} = jwt.verify(token,process.env.SECRET)
   
    req.user = await User.findOne({_id}).select('_id')
    next()

 } catch (error) {
    res.status(402).json({error:'request is not Autherized'})
 }


}

module.exports = requireAuth