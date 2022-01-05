const Command = require("../Structures/Command.js");
const requestsDB = require('../DataBase/requestsDB.js');
const Discord = require("discord.js");


module.exports = new Command({
    name: "rr",
    description: "Removes request",

    async run(message, args, client) {
        //Example -rr requestID

        //Variables
        let messageArgs = args.splice(1).join(" ");
        let roleID = '902656496867872799';

        
        //Errors
        if(!messageArgs) return message.channel.send('**Please specify a request ID**\nExample > *-rr __8782168798487951__*')
        if (!message.member.roles.cache.find(role => role.id === roleID)) return message.channel.send('**You do not have the right permissions to remove requests!**')
       
        //Function

        //Updates Database
        const requestData = await requestsDB.findOne({ request_id: messageArgs });
        const update = { isAccepted: true }
        await requestData.updateOne(update)

        
    }
});