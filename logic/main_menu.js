import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mockData = require("../mock_data/mock_data.json");

export function printMenu({ bot, context }) {
	const intro = "Hello! What can I do for you?";
	var responses = [0, 1, 2];
	var buttons = [];
	responses.forEach((index) => {
		const response = mockData.data.find((it) => it.index == index);
		if (response === null) return;
		buttons.push([
			{
				text: response.question,
				callback_data: "callback" + response.index,
			},
		]);
	});
	bot.telegram.sendMessage(context.chat.id, intro, {
		reply_markup: {
			inline_keyboard: buttons,
		},
	});
}
