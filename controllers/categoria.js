const {response,request}=require('express');
const { model } = require('mongoose');
const Categoria=require('../models/categoria');

async function getAllCategories(req=request,res=response){
    //Recuperamos todos los campos por si alguno tiene valor
    const {name}=req.body;
    //Metemos los campos en una variable con la destructuración
    const query={name}

    //Recorremos los campos para ver si no tiene valor
    for (const i in query){
        if (query[i]===undefined){
            delete query[i];
        }
    }

    
    const categoria=await Categoria.find(query)
    res.json({
        categoria
    })
}

async function addCategory(req=request,res=response){
    const {name}=req.body;
    const categoria=new Categoria({name})
    //Guardamos en base de datos
    await categoria.save();

    //Respondemos con el producto
    res.json({
        categoria
    })
}

async function getProductPorCategoria(req=request,res=response){
    const categoria=req.params.id;
    const producto = await Producto.findById(id).populate('categoria','categoria')
    res.json({
        producto
    })
}

module.exports={getAllCategories,addCategory,getProductPorCategoria}