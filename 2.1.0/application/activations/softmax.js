import matrix from "../../node_modules/npm-matrix/matrix.js";

export default class Softmax{
    constructor(){

    }

    #mathE(value){
        return Math.E ** value;
    }

    forword(inputs){
        this.inputs = inputs;
        this.inputs_flatted = inputs.flat();
        
        const max = this.#getMaxValue(this.inputs_flatted);
        const reducedArray = this.#getReduceByMax(max , this.inputs_flatted);
        const powerToEarray = reducedArray.map((value)=> this.#mathE(value));

        this.output =  this.#normalizeArray(powerToEarray);
        this.output = [this.output]

    }

    #normalizeArray(array){
        const sum = array.reduce((acc , curr)=> acc + curr , 0);
        const normalizedArray = array.map((value)=> value / sum );
        return normalizedArray;
    }

    #getMaxValue(array){
        return array.reduce((max , curr,index)=> {
            (index == 0) && (max = curr);
            (curr > max) && (max = curr);
            return max
        } , 0)

    }
    #getReduceByMax(max,array){
        return array.map((value)=> value - max );
    }

    backword(dvalues){
        this.input_dvalues = dvalues;
        const jacobianMatrix = this.#calcJacobianMatrix();
        this.dinputs = matrix.dot(this.input_dvalues , jacobianMatrix)

    }

    #createEyeCalc(){
        const outputShape = matrix.shape(this.output)
        const shape = [outputShape[1] , outputShape[1]];
        const zeros = matrix.create(shape , 0);
        const eye = zeros.map((arr ,index)=>{
            arr[index] = this.output.flat()[index] 
            return arr;
        })
        return eye;
        
    }

    #calcJacobianMatrix(){
        // this.output= [[.7 , .1 ,.2]]
        this.output_transposed = matrix.transpose(this.output)
        this.eye = this.#createEyeCalc()
        this.power2ofOutputs = matrix.dot(this.output_transposed , this.output)
        this.power2ofOutputs = matrix.dotOne(-1, this.power2ofOutputs);
        return matrix.sum(this.eye , this.power2ofOutputs);
    }
}