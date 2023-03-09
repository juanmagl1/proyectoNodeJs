const Product=require('../models/producto')

const noExistsProduct = async (id) => {
	const producto = await Product.findById(id);
	if (!producto) {
		throw new Error(`ese producto no existe`)
	}
}

const existsObject = async (username) => {
	const producto = await Product.findOne({username:username});
	if (!producto) {
		throw new Error(`ese usuario ya existe`)
	}
}

module.exports={noExistsProduct,existsObject}