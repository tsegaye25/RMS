const express = require('express')
const client = require('../controller/clientController')
const requireAuth=require('../middleware/customerAuth')

const router = express.Router();

router.use(requireAuth)
router.get('/',client.getFoodTypes)
router.get('/:id',client.getsingleFood)

module.exports =  router 