const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);