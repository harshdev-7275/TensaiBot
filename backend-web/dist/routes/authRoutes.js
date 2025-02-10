"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/sign-in", authController_1.signIn);
router.post("/log-in", authController_1.loginUser);
router.post("/log-out", authController_1.logoutUser);
exports.default = router;
