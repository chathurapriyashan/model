export default class Mae{
    constructor(){

    }

    forword(y_pred , y_true){
        this.y_pred = y_pred;
        this.y_true = y_true;
        this.loss = Math.abs(y_pred - y_true)
        // console.log(y_pred , y_true)
        // console.log(this.loss)
    }
    backword(dvalues = 1){
        this.input_dvalues = dvalues;

        if(this.y_pred[0][0] > this.y_true[0]){
            this.dloss = 1;
        }else if(this.y_pred[0][0] < this.y_true[0] ){
            this.dloss = -1
        }
        this.dloss = [[this.dloss * this.input_dvalues]]
        
    //    console.log("pred : ",this.y_pred[0][0] ,"true : ", this.y_true[0] ,"dloss : ", this.dloss,this.y_pred[0][0]  > this.y_true[0] )
    }
}