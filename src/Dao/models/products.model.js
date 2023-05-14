import mongoose from 'mongoose';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        require: true
    },
    thumnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    category: {
        type: String,
        require: true
    },
    status: Boolean
});

export const productModel = mongoose.model(productCollection, productSchema);