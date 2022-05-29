import { Scenes } from "telegraf";

export async function initializeProfile({ bot }) {
	bot.action("profile", (context) => {
		printProfileActions({ bot, context });
	});
	startSetup({ bot });
}

// Action Selection

function printProfileActions({ bot, context }) {
	var buttons = [];
	profileActions.forEach((item) => {
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

const profileActions = [
	{
		text: "Edit Profile",
		callback: "setupprofile",
	},
];

// Setup Profile

const scene = new Scenes.WizardScene(
	"Profile",
	(context) => {
		// Ask for name
		context.reply("What is your name?");
		context.wizard.state.contactData = {};
		return context.wizard.next();
	},
	(context) => {
		// Save name and ask for email
		if (context.message === undefined) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.name = context.message.text;
		context.reply(
			"What is your email?\nTo enjoy student pricing, please use your school email address."
		);
		return context.wizard.next();
	},
	(context) => {
		// Save email and ask for phone
		if (context.message === undefined) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.email = context.message.text;
		context.reply("What is your phone number?", {
			reply_markup: {
				one_time_keyboard: true,
				keyboard: [
					[{ text: "Send my phone number", request_contact: true }],
				],
			},
		});
		return context.wizard.next();
	},
	(context) => {
		// Save phone and ask for member type
		if (
			context.message === undefined ||
			context.message.contact === undefined
		) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.phone =
			context.message.contact.phone_number;
		const toggles = [];
		memberType.forEach((type) => {
			toggles.push([{ text: type }]);
		});
		context.reply("What is your member type?", {
			reply_markup: {
				one_time_keyboard: true,
				keyboard: toggles,
			},
		});
		return context.wizard.next();
	},
	(context) => {
		// Save member type and ask for vaccination status
		if (
			context.message === undefined ||
			memberType.find((type) => type === context.message.text) ===
				undefined
		) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.type = context.message.text;
		const toggles = [];
		yesNo.forEach((option) => {
			toggles.push([{ text: option }]);
		});
		context.reply("Are you vaccinated against COVID-19?", {
			reply_markup: {
				one_time_keyboard: true,
				keyboard: toggles,
			},
		});
		return context.wizard.next();
	},
	(context) => {
		// Save vaccination status
		if (
			context.message === undefined ||
			yesNo.find((type) => type === context.message.text) === undefined
		) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.vaccinated = context.message.text;
		context
			.reply("Successfully Added")
			.then(context.reply(context.wizard.state.contactData));
		return context.scene.leave();
	}
);
const stage = new Scenes.Stage([scene]);

function startSetup({ bot }) {
	bot.use(stage.middleware());
	bot.action("setupprofile", (context) => {
		context.scene.enter("Profile");
	});
}

const memberType = ["Student", "Working Adult", "Tutor"];

const yesNo = ["Yes", "No"];
