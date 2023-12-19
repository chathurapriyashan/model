
export default class CategoricalCrossEntropy{
    constructor(){}

    forword(y_pred , y_true){
        this.y_pred = y_pred;
        this.y_true = y_true;
        this.y_pred_flatted = this.y_pred.flat();        
        this.currTrueIndex = y_true.indexOf(1);
        this.loss = -Math.log(this.y_pred_flatted[this.currTrueIndex]);
    }

    backword(){
        this.dloss = [...this.y_true]
        this.dloss[this.currTrueIndex] = -1 / (this.y_true.length * this.y_pred_flatted[this.currTrueIndex])
        this.dloss = [this.dloss]
    }
}