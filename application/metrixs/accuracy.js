import Mean from "./base_mean.js"

export default class Accuracy extends Mean{
    constructor(){
        super("Accuracy");
    }

    forword(y_pred , y_true){
        this.y_pred = y_pred;
        this.y_pred_flatted = y_pred.flat();
        this.y_true = y_true;
        const convertedPrediction = this.#GetConvertedPrediction(this.y_pred_flatted);
        this.loss = 0;
        if(String(convertedPrediction) == String(this.y_true)) this.loss = 1;
        this.losses.push(this.loss)
    }


    #GetConvertedPrediction(array){
        const max = array.reduce((max , curr , index , arr)=>{
            (index == 0) && ( max = curr ) ;
            (curr > max )  && (max = curr) ;
            return max;
        },0)

        const maxIndex = array.indexOf(max);
        const prediction = new Array(array.length).fill(0);
        prediction[maxIndex] = 1
        return prediction

    }
}