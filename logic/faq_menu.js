import { createRequire } from "module";
const require = createRequire(import.meta.url);
const questions = require("../questions/questions.json");

export function initializeFAQ({ bot }) {
	questions.data.forEach((data) => {
		var callback = "callback" + data.index;
		bot.action(callback, (context) => {
			var buttons = [];
			data.response.forEach((index) => {
				const response = questions.data.find((it) => it.index == index);
				if (response === null) return;
				buttons.push([
					{
						text: response.question,
						callback_data: "callback" + response.index,
					},
				]);
			});
			var message = "<b>" + data.question + "</b>";
			if (data.answer.length > 0) {
				message = message + "\n\n" + data.answer;
			}
			bot.telegram.sendMessage(context.chat.id, message, {
				reply_markup: {
					inline_keyboard: buttons,
				},
				parse_mode: "HTML",
			});
		});
	});
}
