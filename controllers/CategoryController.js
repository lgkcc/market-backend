import CategoryModel from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        res.json(categories)
    }catch (e) {
        return res.status(500).json({message: "Ошибка при получении категорий"})
    }

}

export const addCategories = async (req, res) => {
    try {
        const doc = new CategoryModel({
            title: req.body.title,
            path: req.body.path
        })
        const product = await doc.save()
        res.json(product._doc)
    }catch (e) {
        return res.status(500).json({message: "Ошибка при создании категории"})
    }

}

export const removeCategories = async (req, res) => {
    try {
        CategoryModel.findByIdAndDelete(req.params.id, (err, doc) => {
            if(err){
                return res.status(500).json('Ошибка при удаление категории')
            }
            if(!doc){
                return res.status(404).json('Данная категория не найден или была уже удалена')
            }
            res.json(doc._doc)
        })
    }catch (e) {
        return res.status(500).json({message: "Ошибка при удалении категории"})
    }

}