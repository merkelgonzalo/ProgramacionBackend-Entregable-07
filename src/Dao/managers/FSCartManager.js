import fs from 'fs';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager("/src/products.json");

export default class CartManager{

    constructor(path){
        this.path = path;
    }

    getCarts = async() => {   
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        }
    }

    getCartById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const carts = JSON.parse(data);
            let cartMatched = carts.find(cart => cart.id == aId);

            if(cartMatched == undefined){
                return -1
            }else{
                return cartMatched;
            }
        }else{
            return -1;
        }
    }

    addCart = async () => {
        const carts = await this.getCarts();
        const cart = {};

        cart.products = [];

        if(carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = carts[carts.length-1].id+1;
        }

        carts.push(cart);
    
        await fs.promises.writeFile(`./${this.path}`, JSON.stringify(carts, null, '\t'));
    
        return cart;
    }

    addProduct = async(idCart, idProduct, quant) => {

        const carts = await this.getCarts();
        const cart = await this.getCartById(idCart);
        const product = await productManager.getProductById(idProduct);
        
        if(cart == -1 || product == -1){
            return -1;
        }else{
            let productMatchedPos = cart.products.findIndex(product => product.id == idProduct);
        
            if(productMatchedPos == -1){
                let product = {};
                product.quantity = quant;
                product.id = idProduct;

                cart.products.push(product);
            }else{
                console.log(cart.products[productMatchedPos].quantity);
                cart.products[productMatchedPos].quantity = cart.products[productMatchedPos].quantity+quant;
            }
                
            carts[idCart-1] = cart;
            await fs.promises.writeFile(`./${this.path}`, JSON.stringify(carts, null, '\t'));

            return cart; 
        }

    }

}
