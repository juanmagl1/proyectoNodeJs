const express=require('express')
const {dbConnection}=require('./database/config');
require('dotenv').config();

const app=express()

//Aquí ponemos las rutas
const producto=require('./routes/producto')
const categoria=require('./routes/categoria')
const usuario=require('./routes/usuario')
const auth=require('./routes/auth')
//Conectar a la database
async function connectAtlas(){
    await dbConnection()
}

connectAtlas()

//Middlewares

app.use(express.json())


//Routes
app.use('/productos',producto)
app.use('/categoria',categoria)
app.use('/usuario',usuario)
app.use('/auth',auth)


app.listen(process.env.PORT)