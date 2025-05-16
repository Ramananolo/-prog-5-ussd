import readline from 'readline';
import { MenuHandler } from './MenuHandler.js';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("--- Menu Principal ---");
console.log("1- Mvola");
rl.question("\n> ", async (input) => {
    await MenuHandler.handleMainMenu(input.trim(), rl);
});
