const {Schema,model}=require('mongoose')

const UsuarioSchema= Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    age:{
        type:Number
    }

})

module.exports=model('Usuario',UsuarioSchema)