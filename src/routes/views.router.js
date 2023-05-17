import {Router} from 'express';
import { productModel } from '../Dao/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => { 
    const {page = 1} = req.query;
    let limit = req.query.limit;
    let sort = parseInt(req.query.sort);
    
    if(limit == undefined){
        limit = 10;
    }
    //const products = await productModel.find().lean();
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productModel.paginate({},{limit, page, lean:true });

    //const products = docs;
    let products = docs.slice(0,limit);

    products = await productModel.aggregate([
              { $sort : { price : sort, _id: 1 } }
            ]);

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