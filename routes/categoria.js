const express=require("express")
const { check } = require("express-validator")
const router=express.Router()
const {getAllCategories,addCategory,getCategory,removeCategory} = require('../controllers/categoria')
const {validateFields}=require('../helpers/validate-fields')


router.get('/',getAllCategories)
router.post('/',[
    check('name','Name is mandatory').notEmpty(),
   validateFields 
],addCategory)
router.get('/:id',[
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],getCategory)
router.delete('/:id',[
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],removeCategory)

module.exports=router