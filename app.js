import { session, Telegraf } from "telegraf";
import "dotenv/config";
import express from "express";

import { printStart } from "./logic/start.js";
import { initializeFAQ, printFAQ } from "./logic/faq_menu.js";
import { initializeLocations, printLocation } from "./logic/location.js";

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

bot.command("location", (context) => {
	printLocation({ bot, context }).then(() => {
		checkSceneStatus({ bot, context });
	});
});

bot.command("faq", (context) => {
	printFAQ({ bot, context }).then(() => {
		checkSceneStatus({ bot, context });
	});
});

// initializeProfile({ bot });
// initializeBookings({ bot });
initializeLocations({ bot });
initializeFAQ({ bot });

bot.launch();

function checkSceneStatus({ bot, context }) {
	if (
		context.session === undefined ||
		context.session.__scenes === undefined ||
		context.session.__scenes.cursor == undefined
	)
		return false;
	bot.telegram.deleteMessage(context.chat.id, context.lastSentId);
	bot.telegram.sendMessage(
		context.chat.id,
		'Invalid input. Please re-enter.\n\nTo exit, please type "exit".'
	);
	return true;
}
