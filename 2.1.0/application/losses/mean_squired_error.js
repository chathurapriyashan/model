// class Loss{
//     epochLoss = [];
//     constructor(batchSize, epochSize){
//         this.batchSize = batchSize;
//         this.epochSize = epochSize;
//     }

import matrix from "../../node_modules/npm-matrix/matrix.js";

   
// }




export default class Mse{
    constructor(){

    }
    
   

    forword(y_pred, y_true){
        // console.log((y_pred - y_true)**2)
        this.y_pred = y_pred;
        this.y_true = y_true;
        this.loss = (y_pred - y_true) **2
        this.output = this.loss;
        return this.loss

    }

    backword(dvalue=1){
        this.dvalue = dvalue;
        this.dloss = [[2*(this.y_pred - this.y_true) * dvalue]];
    }

}