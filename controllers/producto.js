const {response,request}=require('express');
const Producto=require('../models/producto');
const Categoria=require('../models/categoria');

//Funcion para añadir un producto a la base de datos

async function addProduct(req=request,res=response){
    const {name,description,stock,price,categoria}=req.body;
    const producto=new Producto({name,description,stock,price,categoria})
    await Categoria.findByIdAndUpdate({_id:categoria},{$push:{producto:producto.id}})
    //Guardamos en base de datos
    await producto.save();

    //Respondemos con el producto
    res.json({
        producto
    })
}

//Obtener todos los productos de la base de datos
async function getAllProducts(req=request,res=response){
    //Recuperamos todos los campos por si alguno tiene valor
    const {name,description,stock,price}=req.body;
    //Metemos los campos en una variable con la destructuración
    const query={name,description,stock,price}

    //Recorremos los campos para ver si no tiene valor
    for (const i in query){
        if (query[i]===undefined){
            delete query[i];
        }
    }

    //Buscamos los productos
    const productos=await Producto.find(query)
    res.json({
        productos
    })
}

//Funcion para recuperar por un id de el producto
async function getProduct(req=request,res=response){
    //Recuperamos el id
    const id=req.params.id;
    //Lo buscamos con el find y como parametro el id
    const product=await Producto.find({ _id:id });
    if (product.length){

        //Mostramos el producto con json 
        res.json({
            product
        })
    }else {
        res.json({
            "message":`Error no existe un producto con el ${id}`
        })
    }

}



async function removeProduct(req=request,res=response){
    //Recuperamos el id
    const id=req.params.id;
    //Con el metodo de buscar por id
    const product=await Producto.findById(id);

    await Categoria.findByIdAndUpdate(product.categoria,{$pull:{"producto":req.params.id}})
    await product.deleteOne()
    //Respondemos el producto que nos ha borrado
    res.json({
        product
    })

    
}
async function editProduct(req=request,res=response){
    //cogemos el id 
    const id=req.params.id;
    //Recogemos el body con una destructuracion
    const {name,description,stock,price,categoria}=req.body;
    const body={name,description,stock,price,categoria};
    const product=await Producto.findById(id);
    if (categoria!=product.categoria){
        await Categoria.findByIdAndUpdate(product.categoria,{$pull:{"producto":req.params.id}});
        await Categoria.findByIdAndUpdate(categoria,{$push:{categoria:product.id}});
        await product.updateOne({body})
    }else {
        await Producto.findByIdAndUpdate(id,body);
    }

    res.json({
        product
    })

}

async function productQueryParams(req=request,res=response){
    const name=req.query.name;
    const productos=await Producto.find({name:name})
    res.json({
        productos
    })
}
module.exports={addProduct,getAllProducts,getProduct,removeProduct,editProduct,productQueryParams}