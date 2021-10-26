const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "suggest",
    description: "Creates a suggestion for the server",

    async run(message, args, client) {
        //Example -suggest You guys should add another role!



        //Variables

        let messageArgs = args.splice(1).join(" ");
        let suggestChannelID = client.channels.cache.get('902657139749818440'); // Change ID
        let suggestionEmbed = new Discord.MessageEmbed();
        let messageAuthorID = message.author.id
        let roleID = message.guild.roles.cache.get('902656496867872799') // Change ID

        let upvote = '⬆️';
        let downvote = '⬇️';
        


        //Errors
        if (!messageArgs) return message.channel.send('**Please specify a suggetion**\nExample > *-suggest __Add a new role called Pro Designers__*')
        if (message.channel != suggestChannelID) return message.channel.send(`**Please make sure you're sending the command in ${suggestChannelID}**`)


        //Create Embed
        suggestionEmbed.setTitle(`${message.author.username} | Suggestion`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription('A new suggestion to improve the server has been made! 🌟')
            .addFields(
                { name: 'Description:', value: `${messageArgs}` },
                { name: 'User who suggested:', value: `<@${messageAuthorID}>` },
            )
            .setFooter('Made by Twuben 🌟')

        //Check if channel is correct    
        
        const sentEmbed = await message.channel.send({ embeds: [suggestionEmbed] })
        await message.delete()
        sentEmbed.react(upvote)
        sentEmbed.react(downvote)


        const filter = (reaction, user) => {
            return [upvote, downvote].includes(reaction.emoji.name)
        };

        const collector = sentEmbed.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (sentEmbed.reactions.cache.get(upvote).count > 10 && sentEmbed.reactions.cache.get(downvote).count < 10 ){ //Amount of people in the community that need to agree on the suggestion
                sentEmbed.reply(`The community has agreed that they want to see this suggestion included in the server! ${roleID}`)
            }
        })
    }
});