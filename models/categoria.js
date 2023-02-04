const {Schema,model}=require('mongoose')

const CategoriaSchema= Schema({
    name:{
        type:String
    },
    producto:[
        {
            type:Schema.Types.ObjectId,
            ref:'Producto'
        }
    ]

})

module.exports=model('Categoria',CategoriaSchema)