const express=require("express")
const router=express.Router()
const {getAllCategories,addCategory,getProductPorCategoria} = require('../controllers/categoria')


router.get('/',getAllCategories)
router.post('/',addCategory)

module.exports=router