const express=require("express")
const router=express.Router()
const {getAllUsers,addUser,getUsers,removeUser,editUser}=require('../controllers/usuario')
const {validateFields}=require('../helpers/validate-fields')
const {validateJWT}=require('../middlewares/validate-jwt')
router.get('/',getAllUsers)
router.post('/',[
    validateJWT
],addUser)
router.get('/:id',getUsers)
router.delete('/:id',removeUser)
router.put('/:id',editUser)

//Si no le pones esto debajo falla diciendo que requiere un middleware
module.exports=router