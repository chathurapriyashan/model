export default class Relu{
    constructor(param = 0 ){
        this.param = param;
    }

    forword(input){
        this.inputs = input;
        this.activationInputs = input.flat();

        this.output = this.activationInputs.map(singleInput=>{
            if(singleInput >= 0 ) return singleInput;
            else return singleInput * this.param;
        });

        this.output = [this.output];

    }

    backword(dvalues){
        this.dvalues = dvalues;
        this.dvalues_flatted = this.dvalues.flat();

        this.dinputs = this.activationInputs.map((singleInput , index)=>{
            const num = (singleInput >= 0 ) ? 1 : this.param;
            return this.dvalues_flatted[index] * num
        });

        this.dinputs = [this.dinputs];
    }
}