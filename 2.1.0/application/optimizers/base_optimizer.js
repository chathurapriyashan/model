export default class Optimizer{
    #step = 0; 
    constructor({momentum=0.0 , decay=0.0 , learning_rate = 0.001}){
        this.lr = learning_rate;
        this.decay = decay;
        this.momentum = momentum; 
    }
    
    preUpdate(){
        if(this.decay){
            this.lr = this.lr * (1/(1 + this.decay * this.#step));
            // console.log(this.lr)
        }
    };
    postUpdate(){
        this.#step += 1;
    };

}