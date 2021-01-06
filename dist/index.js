"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Omikuji_1 = __importDefault(require("./Omikuji"));
const dotenv_1 = __importDefault(require("dotenv"));
const client = new discord_js_1.Client();
dotenv_1.default.config();
client.on('ready', () => {
    if (client.user != null) {
        console.log(`${client.user.username} でログインしています！`);
    }
});
client.on('message', msg => {
    const omikuji = new Omikuji_1.default(msg);
    omikuji.doOmikuji();
});
if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN).catch(err => {
        console.log(err);
    });
}
else {
    client.login().catch(err => {
        console.log(err);
    });
}
