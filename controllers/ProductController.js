import ProductModel from '../models/Product.js'

export const getAllPr0duct = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products.filter(el => el.title.includes(req.query.title || '')).filter(el => el.categories === (req.query.categories || el.categories)))
    }catch (e) {
        res.status(500).json({message: 'Ошибка при получении товаров'})
    }
}
export const getOneProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.json(product)
    }catch (e) {
        res.status(500).json({message: 'Ошибка при получение товара'})
    }
}
export const addProduct = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            categories: req.body.categories,
            ingredients: req.body.ingredients
        })
        const post = await doc.save()
        res.json({
            success: true,
            ...post._doc
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Ошибка при добавление продукта'})
    }
}
export const removeProduct = async (req, res) => {
    try {
        ProductModel.findByIdAndDelete(req.params.id, (err, doc) => {
            if(err){
                return res.status(500).json('Ошибка при удаление товара')
            }
            if(!doc){
                return res.status(404).json('Данный товар не найден или был уже удален')
            }
            res.json({success: true})
        })
    }catch (e) {
        return res.status(500).json('Ошибка при удаление товара')
    }

}
export const updateProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            categories: req.body.categories,
            ingredients: req.body.ingredients
        })
        res.json(
            await ProductModel.findById(req.params.id)
        )
    }catch (e) {
        return res.status(500).json('Ошибка при обновлении товара')
    }

}