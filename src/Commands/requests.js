const Command = require("../Structures/Command.js");
const requestsDB = require('../DataBase/requestsDB.js');
const Discord = require("discord.js");

module.exports = new Command({
    name: 'requests',
    description: 'Shows a list of available requests',
    async run(message, args, client) {
        //Example -requests

        //Variables
        let embed = new Discord.MessageEmbed();
    

        //Errors



        //Function
        var query = requestsDB.find({ isAccepted: false }).select({
            "_id": 0,
            "request_id": 0,
            "__v": 0,
            "isAccepted": 0
        });
        var arr = [];
        query.exec(function (err, results) {
            if (err) throw err;
            results.forEach(function (result) {
                arr.push(result.request_url)
            })

            embed.setTitle('Current available requests')
            .setDescription('These are the current available requests')
            .setFooter('Made by Twuben 🌟 - Available requests V1')
            .setColor('#f5d22e')
            for (let i = 0; i < arr.length; i++){
                embed.addField(`Link nº${[i+1]}`, `${arr[i]}`)
            }

         message.channel.send({ embeds: [embed] })

        })



    }
})
