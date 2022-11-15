const { Client } = require("discord.js");
const { Player } = require("discord-player");

const client = new Client({
  restTimeOffset: 0,
  shards: "auto",
  intents: 641,
});

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
});

client.on("ready", () => {
  console.log("bot is already activated uai. 🤖");
  client.user.setActivity("Suas musica...", { type: "LISTENING" });
});

module.exports = { player, client };
require("./envents")(client);

client.on("messageCreate", (msg) => {
  if (!msg.guild || msg.author.bot) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log("pegou comando")
  require("./commands")(client, msg, args, command);
});

client.login(process.env.TOKEN);