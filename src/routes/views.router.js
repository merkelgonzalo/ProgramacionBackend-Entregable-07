import {Router} from 'express';
import { productModel } from '../Dao/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => { 
    const {page = 1} = req.query;
    //const products = await productModel.find().lean();
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productModel.paginate({},{limit:2, page, lean:true })
    const products = docs;
    res.render('home', {
        products: products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
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