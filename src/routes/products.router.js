import { Router } from 'express';
import ManagerAccess from '../Dao/managers/ManagerAccess.js';
import { productModel } from '../Dao/models/products.model.js';

const router = Router();
const managerAccess = new ManagerAccess();

router.get('/', async (req,res) => {
    try{
        await managerAccess.saveLog('GET all products');
        
        let limit = req.query.limit;
        if(limit == undefined){
            limit = 10;
        }
        let products = await productModel.find();
        products = products.slice(0,limit);
        res.send({
            status: "success",
            payload: products
        });
    }catch(error){
        console.log('Cannot get products with mongoose: '+error)
    }
});

router.get('/:pid', async (req,res)=>{
    try{
        await managerAccess.saveLog('GET a product');
        const idProduct = req.params.pid;
        const result = await productModel.find({_id:idProduct});
        
        res.send({
            status: 'success',
            payload: result
        });
    }catch(error){
        console.log('Cannot get the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

router.post('/', async (req,res) => {
    try{
        await managerAccess.saveLog('POST a product');
        let {title, description, price, thumnail, code, stock, category} = req.body;
    
        if(!title || !price || !code || !category){
            return res.send({status:"error", error: "Incomplete values"});
        }else{
            let result = await productModel.create({
                title,
                description,
                price,
                thumnail,
                code,
                stock,
                category,
                status: true
            });
        
            res.send({
                status: 'success',
                payload: result
            });
        } 
    }catch(error){
        console.log('Cannot post the product with mongoose: '+error)
    }
});

router.put('/:pid', async (req,res) => {
    try{
        await managerAccess.saveLog('UPDATE a product');
        const product = req.body;
        const idProduct = req.params.pid;
        
        if(!product.title || !product.price || !product.code || !product.category){
            return res.send({status:"error", error: "Incomplete values"});
        }else{
            let result = await productModel.updateOne({_id:idProduct}, {$set:product});
            res.send({status: 'success', payload: result})
        }
    }catch(error){
    console.log('Cannot get the product with mongoose: '+error);
    return res.send({status:"error", error: "ID not found"});
    }
});

router.delete('/:pid', async (req,res) => {
    try{
        await managerAccess.saveLog('DELETE a product');
        const idProduct = req.params.pid;
        let result = await productModel.deleteOne({_id:idProduct})
        res.send({status: 'success', payload: result})
    }catch(error){
        console.log('Cannot delete the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

export default router;