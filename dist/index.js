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
const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany();
    console.log('All users:', allUsers);
    res.send(allUsers);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: { username: 'alice@example.com' + Math.random().toString(), password: 'Alice' + Math.random().toString() },
    });
    res.send(user);
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
