export function initializeBookings({ bot, map }) {
	bot.action("bookings", (context) => {
		printBookingActions({ bot, context });
	});
	bot.action("makebooking", (context) => {
		makeBooking({ bot, context, map });
	});
}

// Action Selection

function printBookingActions({ bot, context }) {
	var buttons = [];
	bookingActions.forEach((item) => {
		buttons.push([
			{
				text: item.text,
				callback_data: item.callback,
			},
		]);
	});
	bot.telegram.sendMessage(context.chat.id, "What would you like to do?", {
		reply_markup: {
			inline_keyboard: buttons,
		},
	});
}

const bookingActions = [
	{
		text: "Check Bookings",
		callback: "checkbookings",
	},
	{
		text: "Book a Slot",
		callback: "makebooking",
	},
];

// Check Bookings

function makeBooking({ bot, context, map }) {}
