const { request, response } = require('express');
const Usuario=require('../models/usuario');

async function getAllUsers(req=request,res=response){
    const users=await Usuario.find();
    res.json({
        users
    })
}

function addUser(req=request,res=response){
    const {username}=req.body;
}

module.exports={getAllUsers}