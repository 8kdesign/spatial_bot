export function initializeBookings({ bot, map }) {
	bot.action("bookings", (context) => {
		printBookingActions({ bot, context });
	});
	bot.action("checkbookings", (context) => {
		checkBookings({ bot, context, map });
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

function checkBookings({ bot, context, map }) {
	if (checkLogin(bot, context, map)) {
		// Check Booking
	} else {
		// Initiate Login
	}
}

function makeBooking({ bot, context, map }) {
	if (checkLogin(bot, context, map)) {
		// Make Booking
	} else {
		// Initiate Login
	}
}

// Misc

function checkLogin({ bot, context, map }) {
	const id = context.chat.id;
	const phone = map.get(id);
	return phone !== undefined;
}
