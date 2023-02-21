const Product=require('../models/producto')

const noExistsProduct = async (id) => {
	const producto = await Product.findById(id);
	if (!producto) {
		throw new Error(`ese producto no existe`)
	}
}

const existsObject = async (email) => {
	const producto = await Product.findOne({email});
	if (producto) {
		throw new Error(`ese producto ya existe`)
	}
}

module.exports={noExistsProduct,existsObject}