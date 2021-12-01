const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: 'help',
    description: 'Sends help dm to user',
    async run(message, args, client) {
        //Example -help

        let embed = new Discord.MessageEmbed();
        let messageArgs = args.splice(1).join(" ");
        let author = message.author;

        //Function
        embed.setTitle(`Help for SpyderBot!`)
            .setDescription("If you're having trouble with commands use this guide!")
            .setColor('#f5d22e')
            .setFooter('Made by Twuben 🌟 - Help V1')
            .addFields(
                {name: 'Basic Commands', value: '-help: Displays this guide\n-ping: Shows you the bot and message ping'}, 
                {name: 'Action Commands', value: "-request: use:`-request Logo,Size,Theme,Text,Font,Additional Information`\n Requests your design, every field must be filled\n poll: use:`-poll option1, option2, option3, option4, option5, option6`:\n Creates a poll, staff role needed\n -review: use:`-review @user message`:\n Creates a review on a user\n -suggest: use:`-suggest message`:\n Creates a suggestion"}
            )
               
        //Error
        author.send({ embeds: [embed]}).catch(() => message.channel.send('**Cannot send a direct message, please allow me to do so!**'));  //Send embed and catches if dm's are closed!
    }
})