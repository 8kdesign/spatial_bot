export function initializeBookings({ bot }) {
	bot.action("booking", (context) => {
		makeBooking({ bot, context });
	});
}

function makeBooking({ bot, context }) {
	console.log("Make Booking");
}
