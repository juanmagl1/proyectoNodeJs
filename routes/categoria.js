const express=require("express")
const { check } = require("express-validator")
const router=express.Router()
const {getAllCategories,addCategory,getCategory,removeCategory,updateCategory} = require('../controllers/categoria')
const {validateFields}=require('../helpers/validate-fields')
const {validateJWT}=require('../middlewares/validate-jwt')

router.get('/',getAllCategories)
router.post('/',[
    validateJWT,
    check('name','Name is mandatory').notEmpty(),
   validateFields 
],addCategory)
router.get('/:id',[
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],getCategory)
router.delete('/:id',[
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],removeCategory)
router.put('/:id',[
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],updateCategory)

module.exports=router