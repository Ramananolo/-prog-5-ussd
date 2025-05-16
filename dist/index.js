"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const MenuHandler_1 = require("./MenuHandler");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("--- Menu Principal ---");
console.log("1- Mvola");
console.log("2- Rappel");
console.log("3- SOS");
console.log("4- Service Yas");
console.log("5- Promotions");
console.log("6- Autres");
console.log("7- Sortie");
rl.question("\n> ", async (input) => {
    await MenuHandler_1.MenuHandler.handleMainMenu(input.trim(), rl);
});
