//https://github.com/The-Glit-ch

//this shit is wack

const tmi = require('tmi.js')
require('dotenv').config()

const pre = "!" //You can change this to whatever you want
const cuswords = ["fuck","shit","ass","cum","vore","porn","retard","cunt"]

//Config
const opts = {
    identity: {
      username: process.env.USERNAME,
      password: process.env.PASS
    },
    channels: [
        "nicoxblitz"
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = String(msg.trim()).toLowerCase()

  //Cmd here
  is_cmd = String(commandName).startsWith(pre)
  if (is_cmd){
      //Owner
      //Mod
      if (commandName == `${pre}clean-chat` && context["mod"] || commandName == `${pre}clean-chat` && String(target).replace("#","") == context["username"]){
          client.clear(target);
      }
      //User
      if (commandName == `${pre}help`){
          client.say(target,
          `
          [Mod Commands]
          ${pre}clean-chat -- Deletes every message in chat
          [User Commands]
          ${pre}help -- Show the help message
          [Fun/Misc]
          ${pre}dice -- Roll a dice
          `);
      };
      //Fun
      if (commandName == `${pre}dice`){
          client.say(target,`You rolled a ${Math.floor(Math.random() * 12) + 1} @${context["display-name"]}`)
      };
  }else{
      //Profanity Filter
      contains_profanity = cuswords.includes(commandName);
      if (contains_profanity){
          client.deletemessage(target,context["id"]).catch(()=>{
              return;
          });
          client.say(target,`No profanity @${context["display-name"]}`).catch(()=>{
              return;
          });
      };
  };
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}