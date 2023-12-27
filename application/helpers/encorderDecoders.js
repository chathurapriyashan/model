export default class Encoder{
    constructor(){

    }

    oneHot( {matrix , onValue=1.0 , offValue=0.0, isNumeric = false  , showClasses = true}  ){
        if(!matrix) return new Error("Please Provide a Matrixs or Array for Encode");

        matrix = matrix.flat();
        const keys = [];
        matrix.forEach(value=> keys.includes(value)? undefined : keys.push(value));
        if(!isNumeric) keys.sort();
        else keys.sort((a,b)=> a-b);
        (showClasses) && console.log("One Hot Encoder Used Order is :",keys)
        const depth =keys.length 
        const encodedArray = matrix.map( value => {
            const array = new Array(depth).fill(offValue)
            const index = keys.indexOf(value);
            array[index] = onValue;
            return array;
        });
        return encodedArray;
    }
}