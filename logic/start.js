export function printStart({ bot, context }) {
	return new Promise((resolve) => {
		const intro =
			"Hello! Welcome to Spatial. To open the main menu, type /menu or click on the menu button below.";
		bot.telegram.sendMessage(context.chat.id, intro).then((message) => {
			context.lastSentId = message.message_id;
			resolve();
		});
	});
}
