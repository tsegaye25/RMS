const admin = require("../model/managerModel")
const mongoose=require('mongoose')

const getFoodTypes = async (req,res)=>{
    try {
         const result = await admin.find().sort({cretedAt:-1})
        if(!result){
            res.status(404).json({error:"there is not any item have uploaded"})
        }
        res.status(201).send(result)
    } catch (error) {
        res.status(404).json({error:error.message}).toString();
    }

}

const getsingleFood = async (req,res) => {
    const { id } = req.params
    try {

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"id is not valid"});
         }
         const result = await admin.findById(id)
         if(!result){
            return res.status(400).json({error:"item not found"})
         }
         res.status(201).json(result)
        
    } catch (error) {
        res.status(404).json({error:error.message}).toString();
    }

}

module.exports = { getFoodTypes,getsingleFood }
