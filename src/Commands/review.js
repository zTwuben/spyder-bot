const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "review",
    description: "Sends a review",

    async run(message, args, client) {

        //Variables
        let rating;
        let messageArgs = args.splice(2).join(" ");
        let mentioned = message.mentions.members.first();

        //Errors
        if (!message.mentions.members.first()) return message.channel.send('**Please specify a member**\nExample > *-review __@user__ <message> --#*');
        if (!messageArgs) return message.channel.send('**Please specify a message**\nExample > *-review @user __<message>__ --#*');



        //Check if specified rating
        if (messageArgs.includes("--5")) rating = '★★★★★';
        else if (messageArgs.includes("--4")) rating = '★★★★☆';
        else if (messageArgs.includes("--3")) rating = '★★★☆☆';
        else if (messageArgs.includes("--2")) rating = '★★☆☆☆';
        else if (messageArgs.includes("--1")) rating = '★☆☆☆☆';
        else if (messageArgs.includes("--0")) rating = '☆☆☆☆☆';
        else return message.channel.send('**Please specify a rating of 1-5 at the end of the message**\nExample > *-review @user <message> __--#__*')

        messageArgs = messageArgs.trim().replace('--5', '').replace('--4', '').replace('--3', '').replace('--2', '').replace('--1', '').replace('--0', '').replace(mentioned, '')

        message.delete()
        message.channel.send(`**${message.author} reviewed ${mentioned}**\n > Message: ${messageArgs} \n > *Rating: ${rating}*`)


    }
});