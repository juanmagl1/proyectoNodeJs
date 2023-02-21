const express=require("express")
const { check } = require("express-validator")
const router=express.Router()
const {getAllUsers,addUser,getUsers,removeUser,editUser}=require('../controllers/usuario')
const {validateFields}=require('../helpers/validate-fields')
const {existsObject}=require('../helpers/validators')
const {validateJWT}=require('../middlewares/validate-jwt')
router.get('/',[
],getAllUsers)
router.post('/',[
    validateJWT,
    check('email').custom(existsObject),
    check('name','Name is mandatory').notEmpty(),
    check('username','Username is mandatory').notEmpty(),
    check('email','Email is mandatory').notEmpty(),
    validateFields
],addUser)
router.get('/:id',[
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],getUsers)
router.delete('/:id',[
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],removeUser)
router.put('/:id',[
    check('id','Tiene que ser un id valido').isMongoId(),
    validateFields
],editUser)

//Si no le pones esto debajo falla diciendo que requiere un middleware
module.exports=router