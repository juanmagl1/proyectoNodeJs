const Product=require('../models/producto')

const existsProduct = async (id) => {
	const producto = await Product.findById(id);
	if (!producto) {
		throw new Error(`ese producto no existe`)
	}
}

module.exports={existsProduct}