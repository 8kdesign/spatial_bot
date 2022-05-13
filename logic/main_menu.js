export function printMenu({ bot, context }) {
	const intro = "Hello! What can I do for you?";
	var buttons = [];
	mainMenuItems.forEach((item) => {
		buttons.push([
			{
				text: item.text,
				callback_data: item.callback,
			},
		]);
	});
	bot.telegram.sendMessage(context.chat.id, intro, {
		reply_markup: {
			inline_keyboard: buttons,
		},
	});
}

const mainMenuItems = [
	{
		text: "Browse Locations",
		callback: "locations",
	},
	{
		text: "Ask a Question",
		callback: "callback0",
	},
];
