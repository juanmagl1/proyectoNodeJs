const { request, response } = require('express');
const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { findByIdAndUpdate } = require('../models/usuario');

async function getAllUsers(req=request,res=response){
    const users=await Usuario.find();
    res.json({
        users
    })
}

function addUser(req=request,res=response){
    const {username,password,email,name,age}=req.body;
    const usuario=new Usuario({username,password,email,name,age});
    const passEncrypt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,passEncrypt);
    usuario.save();
    res.json({
        usuario
    })
}

async function getUsers(req=request,res=response){
    const id=req.params.id;
    const user=await Usuario.findById(id);
    if(!user){
        res.json({
            "message":`El usuario con el id ${id} no existe`
        })
    }else {
        res.json({
            user
        })
    }
}

async function removeUser(req=request,res=response){
    const id=req.params.id;
    const user=await Usuario.findByIdAndRemove(id);
    res.json({
        user
    })
}

async function editUser(req=request,res=response){
    const id=req.params.id;
    const body=req.body
    //Actualizamos la contraseña por si nos la cambian para que 
    //se encripte
    const passwordUpdate=bcryptjs.genSaltSync()
    body.password=bcryptjs.hashSync(body.password,passwordUpdate);
    const userUpdateado=await Usuario.findByIdAndUpdate(id,body)

    res.json({
        "message":`Usuario con id ${id} se ha actualizado con exito`
    })
}

module.exports={getAllUsers,addUser,getUsers,removeUser,editUser}