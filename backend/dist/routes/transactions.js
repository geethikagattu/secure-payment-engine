"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');
router.post('/', auth, transactionController.createTransaction);
router.get('/history', auth, transactionController.getTransactionHistory);
exports.default = router;
