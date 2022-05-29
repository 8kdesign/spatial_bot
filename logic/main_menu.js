export function printMenu({ bot, context }) {
	return new Promise((resolve) => {
		const intro = "What can I do for you?";
		var buttons = [];
		mainMenuItems.forEach((item) => {
			buttons.push([
				{
					text: item.text,
					callback_data: item.callback,
				},
			]);
		});
		bot.telegram
			.sendMessage(context.chat.id, intro, {
				reply_markup: {
					inline_keyboard: buttons,
				},
			})
			.then((message) => {
				context.lastSentId = message.message_id;
				resolve();
			});
	});
}

const mainMenuItems = [
	{
		text: "My Profile",
		callback: "profile",
	},
	{
		text: "Make Booking",
		callback: "booking",
	},
	{
		text: "Browse Locations",
		callback: "locations",
	},
	{
		text: "Ask a Question",
		callback: "callback0",
	},
];
