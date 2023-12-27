export default class Msae{
    constructor(){

    }

    forword(y_pred , y_true){
        this.y_pred = y_pred;
        this.y_true = y_true;
        this.loss = ((y_pred - y_true)**2)**0.5
        // console.log(y_pred , y_true)
        // console.log(this.loss)
    }
    backword(dvalues = 1){
        this.input_dvalues = dvalues;
        if(this.y_pred[0][0] >= this.y_true[0]){
            this.dloss = 1;
        }else{
            this.dloss = -1
        }
        this.dloss = [[this.dloss]]
    }
}