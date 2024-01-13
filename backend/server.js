require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const customer=require('./routes/managerRoutes')
const user=require('./routes/userRoutes')

app.use(express.json())

const cors=require('cors');
app.use(cors())

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
});

app.use('/api/dish',customer)
app.use('/api/user',user)
app.use((req, res) => {
    res.status(404).json({error: 'Page not found'});
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    app.listen( process.env.PORT || 4000,()=>{
        console.log(`server connected wth port ${4000}`);
    })

})
  .catch(error=>console.log(error))
