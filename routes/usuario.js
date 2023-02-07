const express=require("express")
const router=express.Router()
const {getAllUsers}=require('../controllers/usuario')

router.get('/',getAllUsers)

//Si no le pones esto debajo falla diciendo que requiere un middleware
module.exports=router