import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signIn = async(req: Request, res: Response ,next:NextFunction) => {

    try {
        const {userName, password} = req.body;
        if(!userName || !password){
            throw new AppError("Missing userName or password", 400);
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                userName
            }
        });

        if(existingUser){
            throw new AppError("User already exist", 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data:{
                userName,
                password:hashedPassword
            }
        })

        res.status(200).json({
            success:true,
            message:"User created successfully"
        })


    } catch (error) {
        next(error);
    }

}

const loginUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {userName, password} = req.body;
        console.log(userName, password);
        if(!userName || !password){
            throw new AppError("Missing userName or password", 400);
        }
        const user = await prisma.user.findUnique({
            where:{
                userName
            }
        })
        console.log(user);
        if(!user || user === null) throw new AppError("User not found", 400);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(!isMatch) throw new AppError("Invalid credentials", 400);

        const token = jwt.sign({userName:user.userName}, process.env.JWT_SECRET  || "abc@123% ",{expiresIn: "7d"});

        res.cookie("tensaibot-token", token, {
            httpOnly: true, // Prevents access via JavaScript
            secure: process.env.NODE_ENV === "production", // Use Secure flag in production
            sameSite: "strict", // Protect against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        console.log(token);
        res.status(200).json({ success: true, message: "Logged in successfully" });


    } catch (error) {
       next(error);
    }
}

const logoutUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error);
        
    }
}
export {signIn , loginUser, logoutUser};