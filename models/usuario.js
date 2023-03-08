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
    },
    img:{
        type:String,
        default:null
    }

})

module.exports=model('Usuario',UsuarioSchema)