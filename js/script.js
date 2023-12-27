import Model from "../application/model.js";

const x = new Array(100).fill(0).map((_,index)=>[index]);
const y = x.map( value=> [value % 2] );




const model= new Model();

model.addLayer(model.Layer_DenseLayer(1 , 1));
model.addLayer(model.Activation_Sigmoid());

model.config({
    loss: model.Loss_Mae(),
    optimizers: model.Optimizer_AdaGrad({
        learning_rate:.1,
        decay:0.0001,
    }),
    metrixs: [model.Matrics_Mae(), model.Matrics_Mse()],
})


model.train({
    x,
    y,
    epochs: 20 ,
    verbose: true,
})


// x.slice(0,5).forEach((value)=>{
//     console.log("target is ", value[0]*8 ," and prediction is " , model.predict([value[0]*4]).flat()[0]);
// })



