import Mean from "./base_mean.js";

export default class Metrics_Mse extends Mean{
    constructor(){
        super("Mse");
    }

    forword(y_pred , y_true){
        this.y_pred = y_pred;
        this.y_true = y_true;
        this.loss = (y_pred - y_true) **2
        this.losses.push(this.loss)
    }
}