import {Router} from 'express';
//import ProductManager from '../Dao/managers/ProductManager.js';
import { productModel } from '../Dao/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => { 
    const products = await productModel.find().lean();
    res.render('home', {products: products});
});

router.get('/realTimeProducts', async (req, res) => { 
    const products = await productModel.find().lean();
    res.render('realTimeProducts', {products: products});
});

// router.get('/chat', async (req, res) => { 
//     const products = await productManager.getProducts();
//     res.render('home', {products: products});
// });

export default router;