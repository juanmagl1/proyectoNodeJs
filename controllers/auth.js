const User=require('../models/usuario');
const bcryptjs=require('bcrypt')
const {genJWT}=require('../helpers/genJWT');
const { request,response } = require('express');

//Metodo para que nos genere un token si el usuario es correcto
const login=async (req=request,res=response)=>{
    //Con la desestructuacion cogemos los campos que queramos del body
    const {email,password}=req.body
    try {
        //Buscamos por el email
        const user=await User.findOne({email})
        //Si user es undefined esque no existe ninguno con ese email
        if(!user){
            return res.status(401).json({
                msg:'email o contraseña invalidos'
            })
        }
        //Verificamos que la contraseña es la correcta
        const validPassword=bcryptjs.compareSync(password,user.password)
        //validPassword devuelve un boolean 
        if (!validPassword){
            return res.status(401).json({
                msg:'Las contraseñas no coinciden'
            })
        }
        //Generamos el token
        const token=await genJWT(user._id);

        //Respondemos con el token
        res.json({
            token
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error en el servidor'
        })
    }

}
module.exports={login}