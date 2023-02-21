const {response,request}=require('express');
const { model } = require('mongoose');
const Categoria=require('../models/categoria');
const Producto=require('../models/producto');

async function getAllCategories(req=request,res=response){
    const categoria=await Categoria.find()
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

async function getCategory(req=request,res=response){
    const id=req.params.id;
    const category= await Categoria.findById(id);
    if (!category){
        res.json({
            category
        })
    }else {
        res.json({
            "message":`La categoria con el id ${id} no existe`
        })
    }
}

async function removeCategory(req=request,res=response){
    const id=req.params.id;
    const category= await Categoria.findById(id);
    //A el producto que coincida su categoria con la que le esta pasando, que le ponga el id a nulo
    await Producto.updateMany({categoria:{$eq:category}},{categoria:null})
    await Categoria.findByIdAndDelete(id);
    res.json({
        category
    })
}

async function updateCategory(req=request,res=response){
    const id=req.params.id;
    const body=req.body;
    const categoria=Categoria.find({name:body.name});
    if ((await categoria).length>1){
        res.json({
            "message":`La categoria tiene ya ese nombre`
        })
    }else{
        const category= await Categoria.findByIdAndUpdate(id,body);
        res.json({
            category
        })
    }
}

module.exports={getAllCategories,addCategory,getCategory,removeCategory,updateCategory}