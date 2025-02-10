import { Request, Response, NextFunction } from "express";

class AppError extends Error{
    public statusCode :number;
    public success:boolean;

    constructor(message:string, statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        Object.setPrototypeOf(this, new.target.prototype);
    }

}

const errorHandler = (err:AppError, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message || "Internal Server Error",
    };
    console.log("Error Handler", err);
    res.status(statusCode).json(response);
}

export{AppError, errorHandler};