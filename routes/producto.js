const express=require("express");
const { check } = require("express-validator");
const router=express.Router()
//Importamos las funciones del controllers
const {addProduct,getAllProducts,getProduct,removeProduct,editProduct,productQueryParams} =require('../controllers/producto');
const { validateFields } = require("../helpers/validate-fields");
const { noExistsProduct } = require("../helpers/validators");
const {validateJWT}=require('../middlewares/validate-jwt')
router.post('/',[
  validateJWT,
check('name','Name is mandatory').notEmpty(),
check('price','Price is mandatory').notEmpty(),
check('stock','stock is mandatory').notEmpty(),
check('categoria','categoria is mandatory').notEmpty(),
validateFields
],addProduct)
router.get('/',getAllProducts)
router.get('/:id',[
  check('id','Tiene que ser un id valido').isMongoId(),  
  validateFields  
],getProduct)
router.delete('/:id',[
    validateJWT,
    check('id').custom(noExistsProduct),
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],removeProduct)
router.put('/:id',[
  validateJWT,
  check('id','Tiene que ser un id valido').isMongoId(),
  validateFields
],editProduct)

module.exports=router
