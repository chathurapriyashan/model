import matrix from "../../node_modules/npm-matrix/matrix.js";
import Optimizer from "./base_optimizer.js";


export default class SGD extends Optimizer{
    constructor({learning_rate=0.001 , decay = 0.0  , momentum = 0.0}){
        super({decay , momentum , learning_rate })
    }

    updateParams(layer){

        if(layer.dweights && layer.dbias){
            const weight_upates = matrix.sum( layer.weights , matrix.dotOne(-this.lr , layer.dweights))
            const bias_updates = matrix.sum(layer.bias ,  matrix.dotOne(-this.lr , layer.dbias) )
            layer.weights = weight_upates;
            layer.bias =  bias_updates;
        }

    }
}