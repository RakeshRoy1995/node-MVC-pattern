const { body } =  require('express-validator');

const createProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];

const updateProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];


module.exports = {
    createProductSchema, 
    updateProductSchema
}