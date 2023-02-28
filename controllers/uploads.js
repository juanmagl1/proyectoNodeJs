const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const { User } = require('../models/usuario');
const { request } = require('http');
const cerveza = require('../models/cerveza');




const upload = async(req, res = response) => {
    
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
        case "cerveza":
             objeto=await cerveza.findById(id);
            
            break;
            case "users":
                objeto=await cerveza.findById(id);
                break;
        default:
            res.json({
                message:"No es una colección valida"
            })
            break;
           
    }
    if (objeto){
        const ruta=path.join(__dirname,'../uploads',collection,objeto.img);
        if (!fs.existsSync(ruta)){
            return res.status(400).json({
                message:"No existe la imagen"
            })
        }
            fs.unlinkSync(ruta);
            const nombre = await uploadFile( req.files,['png','jpg','jpeg','gif'] , collection );
            objeto.img=nombre
            await objeto.save();
            res.json({
                filename:nombre
            })

    }
    
    
}

module.exports = {
    upload,
    updateImage
}