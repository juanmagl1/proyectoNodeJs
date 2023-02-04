const {Schema,model}=require('mongoose')

const ProductoSchema= Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    },
    price:{
        type:Number
    },
    //Relaciones 
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria'
    }
})

module.exports=model('Producto',ProductoSchema)