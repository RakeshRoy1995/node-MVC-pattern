const express = require('express');
const router = express.Router();
const multer = require("multer");

const {
    createProduct,
    deleteProduct,
    getAllProduct,
    singleProduct,
    updateProduct,
} = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/access-control.middleware') ;
const validateRequest = require('../middlewares/error.validation') ;
const { createProductSchema, updateProductSchema } = require('../validators/product.validator');



// storage used with Multer library to define where to save files on server, and how to save filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../uploads' )
    },
    filename: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null,  file.originalname + '-' + Date.now() + '-' + getExtension(file) );
        }else{
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    }
});

function getExtension(file) {
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or kind of file into uploads folder
}).fields([ // fields to accept multiple types of uploads
    { name: "image", maxCount: 1 } // in <input name='fileName' />
]);


router.put('/update', upload,  updateProductSchema,verifyToken,updateProduct);
router.post('/create', upload, createProductSchema,verifyToken,createProduct);
router.get('/', getAllProduct);
router.get('/:id', singleProduct);
router.delete('/:id',verifyToken,deleteProduct);

module.exports = router;