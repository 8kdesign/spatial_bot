import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mockData = require("../mock_data/mock_data.json");

export function initializeMenu({ bot }) {
	mockData.data.forEach((data) => {
		var callback = "callback" + data.index;
		bot.action(callback, (context) => {
			var buttons = [];
			data.response.forEach((index) => {
				const response = mockData.data.find((it) => it.index == index);
				if (response === null) return;
				buttons.push([
					{
						text: response.question,
						callback_data: "callback" + response.index,
					},
				]);
			});
			bot.telegram.sendMessage(
				context.chat.id,
				"Selected: #" + data.index,
				{
					reply_markup: {
						inline_keyboard: buttons,
					},
				}
			);
			if (data.answer.length > 0) {
				bot.telegram.sendMessage(context.chat.id, data.answer);
			}
		});
	});
}
