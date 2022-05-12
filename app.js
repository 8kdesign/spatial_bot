import { Telegraf } from "telegraf";
import { printMenu } from "./logic/main_menu.js";
import { initializeMenu } from "./logic/menu.js";

const bot = new Telegraf("5202467843:AAEw8IbW7tn6teXzDOcJaoFb9r_He1DwTQM");

bot.command("start", (context) => {
	printMenu({ bot, context });
});

initializeMenu({ bot });

bot.launch();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.post("/" + bot.token, (req, res) => {
	bot.processUpdate(req.body);
	res.sendStatus(200);
});
