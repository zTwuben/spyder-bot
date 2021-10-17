const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const accept = '✅';
const deny = '❌';

module.exports = new Command({
    name: "request",
    description: "Makes a request",

    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();
        let messageArgs = args.splice(1).join(" ");
        let logs = client.channels.cache.get('799765423268429875') // Change channel ID later on!
        let pickups = client.channels.cache.get('771435458898690079') // Change channel ID later on!
        let op = message.author




        
        embed.setTitle(`${message.author.username} request.`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription(messageArgs)


        const msg = await message.reply({ embeds: [embed] });
        if(message.attachments.size > 0 ){
            msg.reply(message.attachments.first().url)
        }
        await message.delete();
        msg.react(accept);
        msg.react(deny);
        console.log("Created request embed with reactions");
        
        const filter = (reaction, user) => {
            return [accept, deny].includes(reaction.emoji.name) &&
            message.guild.members.cache.get(user.id).roles.cache.find(r => r.id === "771439121368350760"); //Change role ID later on!
        };


        const collector = msg.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) =>{
            
            if (reaction.emoji.name === accept) {
                const newmsg =  await logs.send({ embeds:  [embed] });
                const member = reaction.users.cache.find((user) => !user.bot);
                newmsg.reply({ content: `${op} your request has been accepted by ${member}`}); 

                newmsg.react(accept)
                const collector2 = newmsg.createReactionCollector({ filter, max: 1 });

                collector2.on('collect', async (reaction, user) =>{
                    if(reaction.emoji.name === '✅'){
                        pickups.send({ content: `Request has been finished ${op}, pick it up here!`})
                    }
                })

            }else if(reaction.emoji.name === deny){
                const Deniedmsg = msg.reply({ content: `Your request has been denied ${op}, have you followed the template?`});
            }
        })
    }
})