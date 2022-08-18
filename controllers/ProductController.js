import ProductModel from '../models/Product.js'

export const getAllPr0duct = async (_, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products)
    }catch (e) {
        res.status(500).json({message: 'Ошибка при получении статей'})
    }
}
export const addProduct = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients
        })
        const post = await doc.save()
        res.json({
            success: true,
            ...post._doc
        })
    }catch (e) {
        res.status(500).json({message: 'Ошибка при добавление продукта'})
    }
}