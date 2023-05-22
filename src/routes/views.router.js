import {Router} from 'express';
import { productModel } from '../Dao/models/products.model.js';
import ManagerAccess from '../Dao/managers/ManagerAccess.js';

const router = Router();
const managerAccess = new ManagerAccess();

router.get('/', async (req, res) => {

    const limit = parseInt(req.query.limit) || 2;
    const sort = parseInt(req.query.sort) || 0;
    const page = parseInt(req.query.page) || 1;
    const queryParam = req.query.query || null;

    try {
        await managerAccess.saveLog('GET all products');

        const query = {};

        if (queryParam) {
            query["$or"] = [
                { category: { $regex: queryParam, $options: 'i' } },
                { status: queryParam}
            ];
        }

        const options = {
        limit,
        page,
        lean: true
        };

        if (sort !== 0) {
            options.sort = { price: sort };
        }

        const result = await productModel.paginate(query, options);

        res.render('home', { 
            products: result.docs,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            prevLink: result.prevLink,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            nextLink: result.prevLink,
            limit,
            sort
        });
    } catch (error) {
        console.log('Cannot get products with mongoose: '+error)
        res.status(500).send('Internal server error');
    }
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