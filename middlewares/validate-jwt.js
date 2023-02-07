const { response, request } = require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/usuario');

async function validateJWT(req=request,res=response,next){
    const token=req.header('x-token');
    if (!token){
        return res.status(401).json({
            message:'No has introducido el token'
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const user=await User.findById(uid)
        if (!user){
            return res.status(401).json({
                message:'El usuario no existe-token no valido'
            })
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports={validateJWT}