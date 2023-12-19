export default class Mean{
    losses = []
    constructor(name){
        this.name = name;

    }
    backword(){
        return this.#log()
    }

    #log(){
        let error = this.losses.reduce((acc, curr)=> acc + curr , 0);
        error /= this.losses.length; 
        this.#reset();
        return `${this.name} : ${error} `;

    }

    

    #reset(){
        this.losses = [];
    }
}
