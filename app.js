const express=require('express')
const {dbConnection}=require('./database/config');
require('dotenv').config();
const fileUpload=require('express-fileupload')
const app=express()

//Aquí ponemos las rutas
const producto=require('./routes/producto')
const categoria=require('./routes/categoria')
const usuario=require('./routes/usuario')
const auth=require('./routes/auth')
const uploads=require('./routes/uploads')
//Conectar a la database
async function connectAtlas(){
    await dbConnection()
}

connectAtlas()

//Middlewares

app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
    createParentPath:true
}));


//Routes
app.use('/productos',producto)
app.use('/categoria',categoria)
app.use('/usuario',usuario)
app.use('/auth',auth)
app.use('/uploads',uploads)


app.listen(process.env.PORT)