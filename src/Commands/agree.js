const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: 'agree',
    description: 'Gives verified role upon agreeing with rules!',
    async run(message, args, client) {
        //Example -agree

        let verifiedRole = '892468150334029884'


        //Errors
        if (message.member.roles.cache.find(role => role.id === verifiedRole)) return message.channel.send('**You already have agreed with our rules**')

        //Function

        message.delete()
        message.member.roles.add(verifiedRole)
    }
})
