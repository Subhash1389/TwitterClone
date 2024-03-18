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
router.post("/:tweetid", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetid } = req.params;
    const { retweetby } = req.user.id;
    let alreadytweet = yield prisma.retweet.findFirst({
        where: {
            tweetid: Number(tweetid),
            retweetby
        }
    });
    if (alreadytweet != null) {
        res.send({ alreadytweet, already: true });
    }
    yield prisma.retweet.create({
        data: {
            tweetid: Number(tweetid),
            retweetby
        }
    });
    yield prisma.tweet.update({
        where: {
            id: Number(tweetid),
        },
        data: {
            retweetcount: { increment: 1 }
        }
    });
    res.send("retweet succesfully");
}));
router.delete("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tweetid = yield prisma.retweet.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            tweetid: true
        }
    });
    if (tweetid != null) {
        yield prisma.tweet.update({
            where: {
                id: tweetid.tweetid
            },
            data: {
                retweetcount: { decrement: 1 }
            }
        });
    }
}));
exports.default = router;
