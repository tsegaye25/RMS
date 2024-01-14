
const mongoose = require('mongoose')

 const Schema = mongoose.Schema;

 const ManagerRestuarant = new Schema ({
    image:String,
    restaurant_name : {
        type:String,
        required:true
    },
    description :{
    type:String
    },
    food_name : {
        type:String,
        required:true
    },
    price : {
        type : Number,
        required:true
    },
   delivery_hour: {
    type : String,
    required:true
   },
   privilage:{
    type:String,
    required:true,
    default:'manager'
  }

 },{timestamps:true})

 module.exports=new mongoose.model("Menu",ManagerRestuarant)
