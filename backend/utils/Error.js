class CustError extends Error{
    constructor(statusCode , message = "Something went wrong" , stack = "", errors = []){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.success = false;

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = CustError