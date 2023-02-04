const express=require("express");
const { check } = require("express-validator");
const router=express.Router()
//Importamos las funciones del controllers
const {addProduct,getAllProducts,getProduct,removeProduct,editProduct,getProductPorCategoria} =require('../controllers/producto');
const { validateFields } = require("../helpers/validate-fields");
const { existsProduct } = require("../helpers/validators");

router.post('/',[
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
    check('id','Tiene que ser un id valido').isMongoId(),
    check('id').custom(existsProduct),
    validateFields
],removeProduct)
router.put('/:id',editProduct)

module.exports=router
