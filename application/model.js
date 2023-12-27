import ModelError from "./helpers/errorHandler.js";
import DenseLayer from "./layers/dense.js";
import Mse from "./losses/mean_squired_error.js";
import SGD from "./optimizers/sgd.js";
import Mae from "./losses/mean_absolute_error.js";
import Msae from "./losses/custom_mean_abosolute_error.js";
import Mae_metrics from "./metrixs/metrix_mae.js";
import Metrics_Mse from "./metrixs/metrix_mse.js";
import Relu from "./activations/relu.js";
import Softmax from "./activations/softmax.js";
import CategoricalCrossEntropy from "./losses/categorical_cross_entropy.js";
import Encoder from "./helpers/encorderDecoders.js";
import Accuracy from "./metrixs/accuracy.js";
import AdaGrad from "./optimizers/adaGrad.js";
import RMSProb from "./optimizers/RMSProp.js";



export default class Model{    
    constructor(layers = []){
        this.layers = layers;
        this.statements = [];
    }

    config({loss , optimizers , metrixs=[]}){
        this.loss = loss;
        this.optimizer = optimizers ;
        this.metrixs = [...metrixs];

        ////show error with methods
        if(!this.layers) return new ModelError("please create a model before train");

        ////show errors with params
        if(!this.loss) return new ModelError('please provide a loss function');
        if(!this.optimizer) return new ModelError('please provide a optimizer');

    }

    train({ x, y , epochs = 1 , batches = 1 , validationData_x , validationData_y , validationSteps ,verbose} = {}){
        this.x = x;
        this.y = y;
        this.epochs = epochs;
        this.batches = batches;
        this.validationData_x = validationData_x;
        this.validationData_y = validationData_y;
        this.validationSteps = validationSteps || validationData_y?.length;
        this.verbose = verbose

        ////show error with methods
        if(!this.layers) return new ModelError("please create a model before train")
        if(!this.loss && !this.optimizer) return new ModelError("please config a model before train")


        //// show error with params
        if(!x) return new ModelError("x is not provided");
        if(!y) return new ModelError("y is not provided");

        // start training model
        this.#trainModel();
    }

    #trainModel(){
        for(let epoch = 0 ; epoch < this.epochs ; epoch++){

            this.x.forEach((value , index) => {
                // this.currInput = [value];
                this.curr_index = index;
        
                //forword oparations
                this.#forword(value)
                this.#clacLoss()
                this.#metrixForword();

                
                //backword propagation
                this.#clacDloss()
                this.#backword()

                this.#optimize()
    

            })

            if(this.verbose){
                this.#metrixBackword()
                this.#showLogs(epoch);
            }

            
            
        }

        if(!this.verbose){
            console.log(`Trained for Epochs "${this.epochs.toLocaleString('en-US')}"`)
        }
    }

    Layer_DenseLayer( nInputs , nNeurons  ){
        return  new DenseLayer(nInputs , nNeurons)
    }

    Loss_Mse(){
        return new Mse();
    }

    Loss_Mae(){
        return new Mae();
    }

    Loss_Msae(){
        return new Msae();
    }

    Loss_CategoricalCrossEntropy(){
        return new CategoricalCrossEntropy();
    }

    Optimizer_Sgd({learning_rate, decay, momentum}){
        return new SGD({learning_rate, decay, momentum});
    }

    Optimizer_AdaGrad({learning_rate, decay, momentum, elipson}){
        return new AdaGrad({learning_rate, decay, momentum, elipson});
    }

    Optimizer_RMSProb({learning_rate, decay, momentum, elipson, rho}){
        return new RMSProb({learning_rate, decay, momentum, elipson, rho});
    }

    Matrics_Mae(){
        return new Mae_metrics();
    }

    Matrics_Mse(){
        return new Metrics_Mse();
    }

    Matrics_Accuracy(){
        return new Accuracy();
    }

    addLayer(layer){
        this.layers.push(layer);
        return
    }

    Encoder(){
        return new Encoder();
    }

    Activation_Relu(param){
        return new Relu(param)
    }

    Activation_Softmax(){
        return new Softmax();
    }




    #forword(value){
        this.currInput =[value]
        this.layers.forEach(layer => {
            layer.forword(this.currInput)
            this.currInput = layer.output
        });

        this.y_preds = this.layers[this.layers.length - 1].output

    }

    #clacLoss(){
        this.curr_loss = this.loss.forword(this.y_preds , this.y[this.curr_index])
    }

    #clacDloss(){
        this.loss.backword()
        this.curr_dvalue = this.loss.dloss;
    }

    #backword(){
        this.layers.reverse();
        this.layers.forEach(layer=>{
            layer.backword(this.curr_dvalue);
            this.curr_dvalue = layer.dinputs;
        })

        this.layers.reverse();
    }

    #optimize(){
        this.optimizer.preUpdate();
        this.layers.forEach(layer=>{
            this.optimizer.updateParams(layer)
        })
        this.optimizer.postUpdate();
    }

    #metrixForword(){
        if (this.metrixs.length == 0 ) return;
        this.metrixs.forEach(metrix => metrix.forword(this.y_preds , this.y[this.curr_index]))
    }

    #metrixBackword(){
        if (this.metrixs.length == 0 ) return;
        this.metrixs.forEach(metrix => this.statements.push(metrix.backword()))


    }

    #showLogs(epoch){
        this.statements.unshift(`Epoch : ${epoch.toLocaleString('en-US')} `);
        const statements = this.statements.join(' || ');
        this.statements = [];
        console.log(statements);
    }

    predict(data){
        this.#forword(data)
        const predictions = this.y_preds
        return predictions
    }


}


