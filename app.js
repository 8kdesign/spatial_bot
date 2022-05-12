import { Telegraf } from "telegraf";
import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";
import { printMenu } from "./logic/main_menu.js";
import { initializeMenu } from "./logic/menu.js";

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

// For Heroku

const app = express();
var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

// Bot

const bot = new Telegraf("5202467843:AAEw8IbW7tn6teXzDOcJaoFb9r_He1DwTQM");

bot.command("start", (context) => {
	printMenu({ bot, context });
});

initializeMenu({ bot });

bot.launch();
