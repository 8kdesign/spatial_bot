import { session, Telegraf } from "telegraf";
import "dotenv/config";
import express from "express";

import { printStart } from "./logic/start.js";
import { printMenu } from "./logic/main_menu.js";
import { initializeFAQ } from "./logic/faq_menu.js";
import { initializeLocations } from "./logic/location.js";
import { checkSceneStatus, initializeProfile } from "./logic/profile.js";

// For Heroku

const app = express();
var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

// Bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.use(session());

bot.command("start", (context) => {
	printStart({ bot, context }).then(() => {
		checkSceneStatus({ bot, context });
	});
});

bot.command("menu", (context) => {
	printMenu({ bot, context }).then(() => {
		checkSceneStatus({ bot, context });
	});
});

initializeProfile({ bot });
initializeLocations({ bot });
initializeFAQ({ bot });

bot.launch();
