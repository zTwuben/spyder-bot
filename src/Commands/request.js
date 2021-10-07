const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "request",
    description: "Makes a request",

    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();
        let messageArgs = args.splice(1).join(" ");
        let logs = client.channels.cache.get('894915496888115250') // Change channel ID later on!
        let pickups = client.channels.cache.get('894713654824534037') // Change channel ID later on!
        let op = message.author




        
        embed.setTitle(`${message.author.username} request.`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription(messageArgs)


        const msg = await message.reply({ embeds: [embed] });
        if(message.attachments.size > 0 ){
            msg.reply(message.attachments.first().url)
        }
        message.delete();
        msg.react('✅');
        msg.react('❌');
        console.log("Created request embed with reactions");
        
        const filter = (reaction, user) => {
            return ["✅", "❌"].includes(reaction.emoji.name) &&
            message.guild.members.cache.get(user.id).roles.cache.find(r => r.id === "894572142073634856"); //Change role ID later on!
            
        };



        msg.awaitReactions({ filter, max: 1 })
        .then(async collected =>  {
            const reaction = collected.first()

            if(reaction.emoji.name === '✅'){
                const newmsg =  await logs.send({ embeds:  [embed] });
                const member = reaction.users.cache.find((user) => !user.bot);
                newmsg.reply({ content: `Request has been accepted by ${member}`}); 

                newmsg.react('✅')
                newmsg.awaitReactions({ filter, max: 1})
                .then(async collected2 =>{
                    const reaction2 = collected2.first()

                    if(reaction2.emoji.name === '✅'){
                        pickups.send({ content: `Request has been finished ${op}, pick it up here!`})
                    }
                })


            } else {
                const Deniedmsg = msg.reply({ content: `Your request has been denied ${op}, have you followed the template?`});
            };


            
        })
    }
})



