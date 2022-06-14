import { questions, responseType } from "../questions/questions.js";

export function initializeFAQ({ bot }) {
	questions.forEach((data) => {
		var callback = "callback" + data.index;
		bot.action(callback, (context) => {
			var buttons = [];
			data.response.forEach((index) => {
				const response = questions.find((it) => it.index == index);
				if (response === undefined) return;
				buttons.push([
					{
						text: response.question,
						callback_data: "callback" + response.index,
					},
				]);
			});
			var message = "<b>" + data.question + "</b>";
			if (data.answer.length > 0) {
				if (data.type === responseType.Image) {
					bot.telegram
						.sendPhoto(context.chat.id, data.answer)
						.then(() => {
							bot.telegram.sendMessage(context.chat.id, message, {
								reply_markup: {
									inline_keyboard: buttons,
								},
								parse_mode: "HTML",
							});
						});
				} else {
					message = message + "\n\n" + data.answer;
					bot.telegram.sendMessage(context.chat.id, message, {
						reply_markup: {
							inline_keyboard: buttons,
						},
						parse_mode: "HTML",
					});
				}
			} else {
				bot.telegram.sendMessage(context.chat.id, message, {
					reply_markup: {
						inline_keyboard: buttons,
					},
					parse_mode: "HTML",
				});
			}
		});
	});
}
