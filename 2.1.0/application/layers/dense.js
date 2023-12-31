// import matrix from "/npm-matrix/matrix.js";
import matrix from "../../node_modules/npm-matrix/matrix.js";

export default class DenseLayer{
    constructor(NInputs,Nneurons){
        this.nNeurons = Nneurons;
        this.nInputs = NInputs;
        this.init();
    }

    init(){
        this.weights = matrix.uniformDistribution([this.nInputs , this.nNeurons], 0.01)
        this.bias = matrix.uniformDistribution([1 , this.nNeurons])
    }

    forword(input){
        this.input = input;
        this.output = matrix.dot(input , this.weights);
        this.output = matrix.sum( this.output  , this.bias);
    }

    backword(dvalues){
        this.input_dvalues = dvalues;

        //////////////////////////////////////////////
        ////calculate dweights

        this.layer_dvalues = [];
        this.weights.forEach((weights , index)=>{
            const dvalues = new Array(weights.length).fill(this.input.flat()[index])
            this.layer_dvalues.push(dvalues)
        })
        this.dweights = []
        this.dweights = [...this.layer_dvalues];
        this.input_dvalues.flat().forEach((dvalue , index)=>{
            this.dweights = this.dweights.map(dweights =>{
                dweights[index] *= dvalue
                return dweights

            } )
        })



        ////////////////////////////////////////////
        ///// calcualte dinputs
        this.dinputs = [];
        this.input_dvalues_flatted = this.input_dvalues.flat();
        this.weights.forEach(weight =>{
            const dinput = weight.reduce((acc , curr , index)=> acc + curr * this.input_dvalues_flatted[index], 0 )
            this.dinputs.push(dinput);
        })

        this.dinputs = [this.dinputs];

        ////////////////////////////////////////////
        ///// calcualte dbias
        this.dbias = [[...this.input_dvalues[0]]]
        
    }
}
