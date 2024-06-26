
const { Client, Events, Routes, GatewayIntentBits } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require("./config.json");
const { REST } = require("@discordjs/rest");
const keepAlive = require('./server');

const client = new Client({ intents: [ 
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent
] });

const rest = new REST({ version: '10' }).setToken(token);
client.on('ready', () => {	console.log('Ready!');});
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'song') {
		await interaction.reply(`${interaction.user} no song compares to ${interaction.options.getString('song_to_compare')}`);
		console.log("command used!");
	}
});

async function main() {
	const commands = [
		{
			name: "song",
			description: "What song do you want me to compare?",
			options: [{
				name: "song_to_compare",
				description: "Song to compare",
				type: 3, // 3 is for string
			}],
		}
	];
	try {
		console.log("Started refreshing application (/) commands.");
		await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });
		client.login(token);
		keepAlive();
		
	} catch (error) {
		console.log(error);		
	}
}

main();




