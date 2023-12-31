import matrix from "../../node_modules/npm-matrix/matrix.js";
import Optimizer from "./base_optimizer.js";

export default class AdaGrad extends Optimizer{
    constructor({learning_rate=0.001 , decay=0.0, momentum=0.0 , elipson = 1e-7}={}){
        super({learning_rate, decay, momentum})
        this.elipson = elipson;
    }

    updateParams(layer){

        if(layer.dweights && layer.dbias){

            if(!layer.weightCache && !layer.biasCache){
                layer.weightCache = matrix.create(matrix.shape(layer.weights) , 0)
                layer.biasCache = matrix.create(matrix.shape(layer.bias) , 0)

            }

            //calculate dweight**2 and dbias**2
            const updateweightCache = matrix.matmul( layer.dweights , layer.dweights);
            const updatebiasCache = matrix.matmul(layer.dbias , layer.dbias);

            // sum with last caches
            layer.weightCache = matrix.sum(layer.weightCache , updateweightCache)
            layer.biasCache = matrix.sum(layer.biasCache , updatebiasCache)

            const weightElipson = matrix.create(matrix.shape(layer.weightCache) , this.elipson)
            const biasElipson = matrix.create(matrix.shape(layer.biasCache) , this.elipson)

            const sqrtWeightCache = matrix.sum(matrix.sqrt(layer.weightCache) , weightElipson)
            const sqrtbiasCache = matrix.sum(matrix.sqrt(layer.biasCache) , biasElipson)

            let weight_upates = matrix.dotOne(-this.lr , layer.dweights);
            let bias_updates = matrix.dotOne(-this.lr , layer.dbias);

            weight_upates = matrix.matdev(weight_upates , sqrtWeightCache)
            bias_updates = matrix.matdev(bias_updates , sqrtbiasCache)

            weight_upates = matrix.sum(layer.weights , weight_upates)
            bias_updates = matrix.sum(layer.bias , bias_updates)

            layer.weights = weight_upates;
            layer.bias =  bias_updates;
        }

    }
}