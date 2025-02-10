"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.signIn = void 0;
const errorHandler_1 = require("../middlewares/errorHandler");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            throw new errorHandler_1.AppError("Missing userName or password", 400);
        }
        const existingUser = yield prisma_1.default.user.findUnique({
            where: {
                userName
            }
        });
        if (existingUser) {
            throw new errorHandler_1.AppError("User already exist", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield prisma_1.default.user.create({
            data: {
                userName,
                password: hashedPassword
            }
        });
        res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signIn = signIn;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        console.log(userName, password);
        if (!userName || !password) {
            throw new errorHandler_1.AppError("Missing userName or password", 400);
        }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                userName
            }
        });
        console.log(user);
        if (!user || user === null)
            throw new errorHandler_1.AppError("User not found", 400);
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch)
            throw new errorHandler_1.AppError("Invalid credentials", 400);
        const token = jsonwebtoken_1.default.sign({ userName: user.userName }, process.env.JWT_SECRET || "abc@123% ", { expiresIn: "7d" });
        res.cookie("tensaibot-token", token, {
            httpOnly: true, // Prevents access via JavaScript
            secure: process.env.NODE_ENV === "production", // Use Secure flag in production
            sameSite: "strict", // Protect against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log(token);
        res.status(200).json({ success: true, message: "Logged in successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutUser = logoutUser;
