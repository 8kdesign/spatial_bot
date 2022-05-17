import { Scenes } from "telegraf";

export async function initializeProfile({ bot }) {
	bot.use(stage.middleware());
	bot.action("profile", (context) => {
		context.scene.enter("Profile");
	});
}

export function checkSceneStatus({ bot, context }) {
	if (
		context.session === undefined ||
		context.session.__scenes === undefined ||
		context.session.__scenes.cursor == undefined
	)
		return false;
	const cursor = context.session.__scenes.cursor;
	bot.telegram.deleteMessage(context.chat.id, context.lastSentId);
	if (cursor < message.length) {
		bot.telegram.sendMessage(context.chat.id, message[cursor - 1]);
	}
	return true;
}

const scene = new Scenes.WizardScene(
	"Profile",
	(context) => {
		context.reply(message[0]);
		context.wizard.state.contactData = {};
		return context.wizard.next();
	},
	(context) => {
		context.reply(message[1]);
		if (context.message === undefined) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.name = context.message.text;
		return context.wizard.next();
	},
	(context) => {
		context.reply(message[2], {
			reply_markup: {
				one_time_keyboard: true,
				keyboard: [
					[{ text: "Send my phone number", request_contact: true }],
				],
			},
		});
		if (context.message === undefined) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.email = context.message.text;
		return context.wizard.next();
	},
	(context) => {
		if (
			context.message === undefined ||
			context.message.contact === undefined
		) {
			context.reply("Invalid input. Set profile exited.");
			return context.scene.leave();
		}
		context.wizard.state.contactData.phone =
			context.message.contact.phone_number;
		context.reply(context.wizard.state.contactData);
		return context.scene.leave();
	}
);

const stage = new Scenes.Stage([scene]);

const message = [
	"What is your name?",
	"What is your email?",
	"What is your phone number?",
];
