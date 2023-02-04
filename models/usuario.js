const {Schema,model}=require('mongoose')

const UsuarioSchema= Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    age:{
        type:Number
    },
    rol:{
        type:String
    },

})

module.exports=model('Producto',ProductoSchema)