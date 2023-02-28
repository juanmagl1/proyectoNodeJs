const { Router } = require('express');
const { check } = require('express-validator');
const {upload,updateImage} = require('../controllers/uploads');
const { validateFields } = require('../helpers/validate-fields');
const coleccion= ['categoria','producto','servicio']


const router = Router();


router.post( '/', upload );
router.put('/:collection/:id',[
    check('collection','No existe esa colección').isIn(coleccion),
    check('id','El id no es valido').isMongoId(),
    validateFields
],updateImage)




module.exports = router;