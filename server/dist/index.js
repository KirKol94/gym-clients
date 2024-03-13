"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
(0, dotenv_1.config)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app_1.app.listen(PORT, () => {
    console.log(`server is ready on : http://localhost:${PORT}`);
});
