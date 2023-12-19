import Mean from "./base_mean.js";


export default class Mae_metrics extends Mean{
    
    constructor(){
        super("Mae");
    }

    forword(y_pred , y_true){
        this.loss = Math.abs(y_pred - y_true);
        this.losses.push(this.loss)
    }



}

// export default class Mae_metrics{
//     losses = []
    
//     constructor(){}
//     forword(y_pred , y_true){
//         this.loss = Math.abs(y_pred - y_true);
//         this.losses.push(this.loss)
//     }

//     backword(){
//         return this.#log()
//     }

//     #log(){
//         // console.log(this.losses)
//         let mae = this.losses.reduce((acc, curr)=> acc + curr , 0);
//         mae /= this.losses.length; 
//         this.#reset();
//         return `Mae : ${mae} `;

//     }

//     #reset(){
//         this.losses = [];
//     }

// }