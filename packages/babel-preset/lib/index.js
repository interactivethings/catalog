"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reactspecimen_source_1 = __importDefault(require("./reactspecimen-source"));
exports.default = () => ({
    plugins: [reactspecimen_source_1.default]
});
