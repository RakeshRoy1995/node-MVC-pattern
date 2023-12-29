const {  model, Schema } = require('mongoose') ;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            // unique: true,
        },
        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            // unique: true,
        },
        status: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            required: true,
            // unique: true,
        },
    },
    { timestamps: true }
);

ProductSchema.statics.findAll = function() {
    return this.find({});
    // return this.find({ _id: new RegExp(id, 'i') });
};

const Product = model('products', ProductSchema);

module.exports = {
    Product
}
