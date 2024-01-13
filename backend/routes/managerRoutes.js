const customer = require('../controller/managerController')

const express = require('express')

const routes=express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/')
    },
      filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    },
  })
 
  const upload = multer({ storage: storage })

  routes.post('/customer',upload.single('image'),customer.postCustomer)
  routes.get('/customer',customer.getCustomer)
  routes.get('/customer/:id',customer.getSingleCustomer)
  routes.patch('/customer/:id',upload.single('image'),customer.updateCustomer)
  routes.delete('/customer/:id',customer.deleteCustomer)

  module.exports = routes
