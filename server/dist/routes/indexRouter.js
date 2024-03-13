"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
const indexRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        res.send({ message: 'ok' });
    });
    router.post('/register', (req, res) => {
    });
    return router;
};
exports.indexRouter = indexRouter;
