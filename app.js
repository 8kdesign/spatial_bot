import { Telegraf } from "telegraf";
import express from "express";
import { printMenu } from "./logic/main_menu.js";
import { initializeFAQ } from "./logic/faq_menu.js";
import { initializeLocations } from "./logic/location.js";

// For Heroku

const app = express();
var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

// Bot

const bot = new Telegraf("5202467843:AAEw8IbW7tn6teXzDOcJaoFb9r_He1DwTQM");

var debug = "";
bot.command("debug", (context) => {
	bot.telegram.sendMessage(context.chat.id, debug);
});

bot.command("start", (context) => {
	printMenu({ bot, context });
});

initializeLocations({ bot });
initializeFAQ({ bot });

bot.launch();
