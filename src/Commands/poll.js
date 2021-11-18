const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "poll",
    description: "Creates a poll",
    async run(message, args, client) {
        // Example -poll Should we add butterflies emoji?, Yes, No, Maybe, etc..


        let embed = new Discord.MessageEmbed();
        let messageArgs = args.splice(1).join(" ").split(',').map(elem => elem.trim());
        let [title, option1, option2, option3, option4, option5, option6] = messageArgs;
        let roleID = '902656496867872799' // Change ID

        let circlesArray = ['🟢', '🟠', '🟣', '🟡', '🔴', '⚪']

        //Errors
        if (!title) return message.channel.send('**Please specify a title**\nExample > *-poll __Should I add this?__, option1, option2, option3, etc..*')
        if (!option1) return message.channel.send('**Please specify an option**\nExample > *-poll  I add this?, __option1__, option2, option3, etc..*')
        if (!option2) return message.channel.send('**Please specify another option**\nExample > *-poll  I add this?, option1, __option2__, option3, etc..*')
        if (!message.member.roles.cache.find(role => role.id === roleID)) return message.channel.send('**You do not have the right permissions to create a poll!**')

        //Function

        embed.setTitle(`Poll: ${title}`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription('To vote please react with any of the emojis listed below')
            for (let i = 1; i < messageArgs.length; i++){
                embed.addField(`${circlesArray[i]}: ${messageArgs[i]}`, '\u200B')
            }


            const msg = await message.channel.send({ embeds: [embed] })
            for (let o = 1; o < messageArgs.length; o++){
                msg.react(`${circlesArray[o]}`)
            }
    }
})