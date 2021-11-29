const Command = require("../Structures/Command.js");
const Discord = require('discord.js');

const accept = '✅';
const deny = '❌';

module.exports = new Command({
    name: 'request',
    description: 'Makes a request',

    async run(message, args, client) {
        //Example -request Type, Size, Theme, Text, Font, Additional Info

        let embed = new Discord.MessageEmbed();
        let messageArgs = args.splice(1).join(" ").split(",").map(elem => elem.trim());
        let [type, size, theme, text, font, additional_info] = messageArgs
        let attachment = await message.attachments.first()
        let officialDesigner = '771439121368350760'
        let apprenticeDesigner = '910912204637876225'
        let logs = client.channels.cache.get('799765423268429875') // Change channel ID later on!
        let pickups = client.channels.cache.get('771435458898690079') // Change channel ID later on!
        let op = message.author


        //Errors
        if (!type) return message.channel.send('**Please specify a type of design**\nExample > *-request __Logo__, size, theme, text, font, Additional Info*').then(message.delete());
        if (!size) return message.channel.send('**Please specify a size**\nExample > *-request type, __512x512__, theme, text, font, Additional Info*').then(message.delete());
        if (!theme) return message.channel.send('**Please specify a theme**\nExample > *-request type, size, __None__, text, font, Additional Info*').then(message.delete());
        if (!text) return message.channel.send('**Please specify a text**\nExample > *-request type, size, theme, __Im the best__, font, Additional Info*').then(message.delete());
        if (!font) return message.channel.send('**Please specify a font**\nExample > *-request type, size, theme, text, __None__, Additional Info*').then(message.delete());
        if (!additional_info) return message.channel.send('**Please specify additional information**\nExample > *-request type, size, theme, text, font, __None__*').then(message.delete());

        //Function

        embed.setTitle(`${message.author.username} request`)
            .setDescription('Request information can be found below!')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(attachment)
            .setColor('#f5d22e')
            .setFooter('Made by Twuben 🌟 - Requests V2')
            .addField(`Type`,`${type}`)
            .addField(`Size`,`${size}`)
            .addField(`Theme`,`${theme}`)
            .addField(`Text`,`${text}`)
            .addField(`Font`,`${font}`)
            .addField(`Additional Information`,`${additional_info}`)
            


        //Sends embed & deletes op message
        const msg = await message.channel.send({ embeds: [embed] });
        await message.delete();

        msg.react(accept);
        msg.react(deny);

        //Creates filter to prevent non-allowed users of accepting

        const filter = (reaction, user) => {
            return [accept, deny].includes(reaction.emoji.name) &&
                message.guild.members.cache.get(user.id).roles.cache.find(r => r.id === officialDesigner || r.id === apprenticeDesigner);
        };

        //Creates a reaction collector 

        const collector = msg.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === accept) {
                const newmsg = await logs.send({ embeds: [embed] });
                const member = reaction.users.cache.find((user) => !user.bot);
                newmsg.reply({ content: `Request has been accepted by ${member}`});

                newmsg.react(accept)
                const collector2 = newmsg.createReactionCollector({ filter, max: 1 });

                collector2.on('collect', async (reaction, user) =>{
                    if(reaction.emoji.name === '✅'){
                        pickups.send({ content: `Request has been finished ${op}, pick it up here!`})
                    }
                })
            } else if (reaction.emoji.name === deny) {
                const Deniedmsg = msg.reply({ content: `Your request has been denied ${op}, have you followed the template?`});
            }
        })
    }
})