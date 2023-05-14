import { Router } from 'express';
import ManagerAccess from '../Dao/managers/ManagerAccess.js';
import { cartModel } from '../Dao/models/carts.model.js';
import { productModel } from '../Dao/models/products.model.js';

const router = Router();
const managerAccess = new ManagerAccess();

router.get('/', async (req,res) => {
    try{
        await managerAccess.saveLog('GET all carts');
        const limit = req.query.limit;
        const carts = await cartModel.find();
        if(!limit){
            res.send({result: "success", payload: carts});
        }else{
            const cartsLimit = carts.filter(cart => cart.id <= limit);
            res.send({result: "success", payload: cartsLimit});
        }
    }catch(error){
        console.log('Cannot get carts with mongoose: '+error)
    }
});

router.get('/:cid', async (req,res)=>{
    try{
        await managerAccess.saveLog('GET a cart');
        const idCart = req.params.cid;
        const result = await cartModel.find({_id:idCart});
        
        res.send({
            status: 'success',
            payload: result
        });
    }catch(error){
        console.log('Cannot get the cart with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

router.post('/', async (req,res) => {
    try{
        await managerAccess.saveLog('POST a cart');
        let result = await cartModel.create({});
        res.send({
            status: 'success',
            payload: result
        }); 
    }catch(error){
        console.log('Cannot post the cart with mongoose: '+error)
    }
});

router.post('/:cid/product/:pid', async (req,res) => {

    try{
        await managerAccess.saveLog('UPDATE a cart');
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const quantityBody = req.body.quantity

        const cart = await cartModel.find({_id:idCart});
        cart[0].products.push({product:idProduct, quantity:quantityBody});
        
        const result = await cartModel.updateOne({_id:idCart}, {$set:cart[0]});

        res.send({
            status: 'success',
            payload: result
        });
    }catch(error){
        console.log('Cannot get the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

router.delete('/:cid/products/:pid', async (req,res) => {
    //deberá eliminar del carrito el producto seleccionado
    try{
        await managerAccess.saveLog('DELETE a product in a cart');
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        const cart = await cartModel.find({_id:idCart});
        //cart[0].products.find(element.product => element.product.id = idProduct);

        //let pos = frutas.indexOf('Banana')

        cart[0].products.pop();
        
        const result = await cartModel.updateOne({_id:idCart}, {$set:cart[0]});

        res.send({
            status: 'success',
            payload: result
        });
    }catch(error){
        console.log('Cannot get the product with mongoose: '+error);
        return res.send({status:"error", error: "ID not found"});
    }
});

router.delete('/:cid', async (req,res) => {
    // deberá eliminar todos los productos del carrito 
});

router.put('/:cid', async (req,res) => {
    //deberá actualizar el carrito con un arreglo de productos con el formato especificado
});

router.put('/:cid/products/:pid', async (req,res) => {
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
});

export default router;