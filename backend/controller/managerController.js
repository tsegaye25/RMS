
const {  mongoose } = require("mongoose")

const customer = require("../model/managerModel")

const postCustomer = async (req,res)=> {
    const {restaurant_name,description,food_name,price,delivery_hour} = req.body

    let EmptyField=[]

    if(!restaurant_name){
       EmptyField.push('restaurant_name')
    }

    if(!description){
        EmptyField.push('description')
     }

     if(!food_name){
        EmptyField.push('food_name')
     }

     if(!price){
        EmptyField.push('price')
     }
     
     if(!delivery_hour){
        EmptyField.push('delivery_hour')
     }

     if(EmptyField.length > 0) {
        res.status(404).json({error : "please fill in all fields",EmptyField})
     }

     try {
         const customers = await customer.create({image: req.file ? req.file.filename : '',
         restaurant_name,
         description,
         food_name,
         price,
         delivery_hour
        })
        if(!customers){
        return res.status(404).json({error:"no such customer"})
        }

       res.status(200).json(customers)

     } catch (error) {
        res.status(401).json({error:error.message}).toString();
     }
}


const getCustomer = async (req,res)=>{
    try {
      const result = await customer.find().sort({createdAt:-1})
      if(!result){
         return  res.status(404).json({error:"there is not any items"})
      }
      res.status(201).send(result)
    } catch (error) {
      res.status(404).json({error:error.message}).toString();
    }
}


const getSingleCustomer = async (req,res)=>{

   const { id }=req.params
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"id is not valid"});
   }
   const result = await customer.findById(id)
   
   if(!result){
      return res.status(400).json({error:"item not found"})
   }
   res.status(201).json(result)

}


const updateCustomer = async (req, res) => {
   const { restaurant_name, description, food_name, price, delivery_hour } = req.body;
   const customerId = req.params.id; // Assuming the customer ID is provided in the request parameters
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"id is not valid"});
   }
   try {
     const updatedCustomer = await customer.findByIdAndUpdate(
       customerId,
       {
         image: req.file ? req.file.filename : '',
         restaurant_name,
         description,
         food_name,
         price,
         delivery_hour
       },
       { new: true } // Return the updated document
     );
 
     if (!updatedCustomer) {
       return res.status(404).json({ error: 'Customer not found' });
     }
 
     res.status(200).json(updatedCustomer);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 const deleteCustomer = async (req,res)=> {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"id is not valid"});
   }
   
   const result = await customer.findByIdAndDelete(id,{new:true})

   if(!result){
      return res.status(404).json({error:"could not item found"});

   }
   res.status(201).json(result)

 }
   
module.exports = {
    postCustomer,getCustomer,getSingleCustomer,updateCustomer,deleteCustomer
}

