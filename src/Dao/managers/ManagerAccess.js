import fs from 'fs';
import __dirname from '../../utils.js';


export default class ManagerAccess{

    async saveLog(method){

        const date = new Date().toLocaleDateString();
        const hour = new Date().toLocaleTimeString();
        const message = `Date: ${date} - Hour: ${hour} - Method: ${method}`
        console.log(message);
        await fs.promises.appendFile( __dirname +'/Dao/managers/logs.txt',`Date: ${date} - Hour: ${hour} - Method: ${method}\n`,(err)=>{
            console.log(err);
            return err;
        })

    }

}