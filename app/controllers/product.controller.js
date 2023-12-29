const logger = require('../config/logger');
const {dataFormate , ProductTableFormateObj } = require('../common/data-formate');
const Product = require('../models/Product.model').Product;
const { formatError } = require('../utils/error.util');

const NAMESPACE = 'Product Controller';


// Create Categories
const createProduct = async (req, res) => {
    try {
        const { name, description , price , status } = req.body;
        const newCategorie = new Product({ name, description , price , status , image : req?.files?.image[0].filename});
        await newCategorie.save();

        res.json({ success: true , newCategorie });
    } catch (err) {
        logger.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json(formatError(err));
    }
};

// Update Product
const updateProduct = async (req, res) => {
    
    try {
        const { id , name, description , price , status } = req.body;
        const categorieFound = await Product.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('Product not found'));
        }

        const to_update = {
            name,
            description,
            price,
            status,
            
        };

        console.log("req?.files" , req?.files , req.body);
        

        if (req?.files?.image) {
            to_update.image = req?.files?.image[0].filename
        }

        await Product.findByIdAndUpdate(id, to_update);

        res.json({ success: true });
    } catch (err) {
        logger.error(NAMESPACE, 'Update Product error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single Product
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productFound = await Product.findById(id);

        if (!productFound) {
            return res.status(404).json(formatError('No Product found'));
        }

        let productData = dataFormate(ProductTableFormateObj , productFound , false)

        res.json(productData);
    } catch (err) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const categorieFound = await Product.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('No Product found'));
        }

        await Product.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// Get All Products
const getAllProduct = async (req, res) => {
    try {

        const published = req.query.published;

        if (published === 'true') {
            const today = new Date().toISOString();
            const data = await Product.find({ publish: true }).sort({ date: 'asc' });
            return res.json(data);
        } else {

            const data = await Product.findAll();
            let productData = dataFormate(ProductTableFormateObj , data )

            return res.json(productData);
        }
    } catch (err) {
        logger.error(NAMESPACE, 'View all data error', err);
        res.status(500).json(formatError('Server error'));
    }
};

module.exports = {
    createProduct, 
    updateProduct,
    singleProduct,
    deleteProduct,
    getAllProduct
}