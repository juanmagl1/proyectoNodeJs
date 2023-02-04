const express=require('express')
const {dbConnection}=require('./database/config');
require('dotenv').config();

const app=express()

//Aquí ponemos las rutas
const producto=require('./routes/producto')
const categoria=require('./routes/categoria')
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

app.listen(process.env.PORT)