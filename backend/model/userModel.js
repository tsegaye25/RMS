const bcrypt = require('bcrypt');
const validator = require('validator')

const mongoose=require('mongoose')

const Schema = mongoose.Schema;

const userModel = new Schema ({
     email: {
        type:String,
        required:true,
        unique:true
     },
     password: {
        type:String,
        required:true
     }
})


//static signup method
userModel.statics.signup = async function (email,password){

   if(!email || !password){
      throw Error('All field must be full field')
   }

   if(!validator.isEmail(email)){
      throw Error('Email is not valid')
   }

   if(!validator.isStrongPassword(password)){
      throw Error('password is not strong enough the password must include uppercase,lowercase, number and special characters')
   }

const exists = await this.findOne({email})

if(exists) {
   throw Error('email already in use')
}
const salt = await bcrypt.genSalt(10)
const hash=await bcrypt.hash(password,salt)
const user=await this.create({ email,password:hash })

 return user;

}

//static login method
userModel.statics.login = async function (email,password){

   if(!email || !password){
      throw Error('All field must be full field')
   }

   const user = await this.findOne({email})
   
   if(!user) {
      throw Error('email does not exists')
   }

   const match=await bcrypt.compare(password, user.password)

   if(!match) {
      throw Error('Incorrect password')
   }


   
    return user;
   
   }



module.exports=new mongoose.model('User',userModel)