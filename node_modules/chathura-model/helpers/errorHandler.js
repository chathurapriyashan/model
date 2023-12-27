export default class ModelError{
    constructor(err){
        this.err =err;
        this.err_message = err.message
        this.throw();
        
    }

    throw(){
        throw new Error(this.err_message || this.err)
    }
}