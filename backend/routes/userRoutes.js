const express=require('express')
const routes=express.Router();
const user=require('../controller/userController')


routes.post('/login',user.postLogin)
routes.post('/signup',user.postSignup)

module.exports=routes
