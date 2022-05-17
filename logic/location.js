export function initializeLocations({ bot }) {
	bot.action("locations", (context) => {
		printSelection({ bot, context });
	});
	locations.forEach((location) => {
		bot.action(location.callback, (context) => {
			var message =
				"<b>" +
				location.name +
				"</b>" +
				"\n\nOpening Hours: " +
				location.opening_hours +
				"\nAddress: " +
				location.address;
			bot.telegram
				.sendVenue(context.chat.id, location.lat, location.long)
				.then(() => {
					bot.telegram.sendMessage(context.chat.id, message, {
						parse_mode: "HTML",
					});
				});
		});
	});
}

function printSelection({ bot, context }) {
	const intro =
		"Situated closed to the heartlands, our charming coworking space is surrounded by a multitude of F&B and lifestyle establishments. Spatial is easily accessible and offers sophisticated and beautiful spaces that help you enhance your productivity and innovation. \n\nSpatial is currently available at the following locations:";
	var buttons = [];
	locations.forEach((location) => {
		buttons.push([
			{
				text: location.name,
				callback_data: location.callback,
			},
		]);
	});
	bot.telegram.sendMessage(context.chat.id, intro, {
		reply_markup: {
			inline_keyboard: buttons,
			one_time_keyboard: true,
		},
	});
}

const locations = [
	{
		name: "The Midtown - Hougang",
		opening_hours: "7am to 2am",
		address:
			"1187 Upper Serangoon Road #01-34 The Midtown, Singapore 533971",
		long: "103.89506",
		lat: "1.37047",
		callback: "location0",
	},
	{
		name: "Toa Payoh Central - Toa Payoh",
		opening_hours: "7am to 2am",
		address: "185 Toa Payoh Central #02-342 (Lift E), Singapore 310185",
		long: "103.84999",
		lat: "1.33265",
		callback: "location1",
	},
	{
		name: "Vision Exchange - Jurong East",
		opening_hours: "7am to 12am",
		long: "103.74450",
		lat: "1.33020",
		address: "2 Venture Drive #02-06 Vision Exchange, Singapore 608526",
		callback: "location2",
	},
];
