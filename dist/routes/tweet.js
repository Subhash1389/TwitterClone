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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userid = req.user.id;
    let result = yield prisma.tweet.create({
        data: {
            title,
            content,
            userid
        }
    });
    console.log(result);
    res.send({ result: result });
}));
router.delete("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    let tweet = yield prisma.tweet.findUnique({
        where: {
            id: id,
            userid: req.user.id
        }
    });
    if (!tweet) {
        return res.send("not authorisize to delete tweet");
    }
    let result = yield prisma.tweet.delete({
        where: {
            id
        }
    });
    console.log(`your tweet with id ${id} deleted`);
    res.send({ result: result });
}));
router.put("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, content } = req.body;
    let tweet = yield prisma.tweet.findUnique({
        where: {
            id: id,
            userid: req.user.id
        }
    });
    if (!tweet) {
        return res.send("not authorisize to delete tweet");
    }
    let result = yield prisma.tweet.update({
        where: {
            id
        },
        data: {
            title: title,
            content: content
        }
    });
    console.log(`your content updated on tweet id ${id}`);
    res.send({ result: result });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield prisma.user.findMany({
        select: {
            firstname: true,
            lastname: true,
            tweet: {
                select: {
                    title: true,
                    content: true
                }
            }
        }
    });
    res.send({ result: result });
}));
exports.default = router;
