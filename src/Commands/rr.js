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

        
        //Errors
        if(!messageArgs) return message.channel.send('**Please specify a request ID**\nExample > *-rr __8782168798487951__*')
       
        //Function

        //Updates Database
        const requestData = await requestsDB.findOne({ request_id: messageArgs });
        const update = { isAccepted: true }
        await requestData.updateOne(update)

        
    }
});