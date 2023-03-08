const path = require('path');
const fs= require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const categoria = require('../models/categoria')
const producto=require('../models/producto')
const { request } = require('http');
const usuario = require('../models/usuario');




const upload = async(req=request, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage=async (req=request,res=response)=>{
    const {id,collection}=req.params;
    let objeto;
    switch (collection) {
        case "categoria":
             objeto=await categoria.findById(id);
            
            break;
            case "producto":
                objeto=await producto.findById(id);
                break;
            case "usuarios":
                objeto=await usuario.findById(id);
                break;
        default:
           return res.json({
                message:"No es una colección valida"
            })
            break;
           
    }
    if (objeto){
        if (objeto.img){
            const ruta=path.join(__dirname,'../uploads',collection,objeto.img);
            if (!fs.existsSync(ruta)){
                return res.status(400).json({
                    message:"No existe la imagen"
                })
            }
            fs.unlinkSync(ruta);
        }
            const nombre = await uploadFile( req.files,['png','jpg','jpeg','gif'] , collection );
            objeto.img=nombre
            await objeto.save();
            res.json({
                filename:nombre
            })

    }else {
        res.json({
            message:"No tiene imagen"
        })
    }
    
    
}

module.exports = {
    upload,
    updateImage
}