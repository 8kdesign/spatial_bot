export function printStart({ bot, context }) {
	return new Promise((resolve) => {
		const intro =
			"Hello! Welcome to Spatial. Click on the menu button below to see all commands. Alternatively, tap on the following commands:\n\n/location - View all Spatial locations.\n/faq - View frequently asked questions.";
		bot.telegram.sendMessage(context.chat.id, intro).then((message) => {
			context.lastSentId = message.message_id;
			resolve();
		});
	});
}
