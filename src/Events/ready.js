const Event = require("../Structures/Event.js");
const Mongoose = require('mongoose');

module.exports = new Event("ready", (client) => {
    console.log("Bot is online!")
    client.user.setPresence({
        activities: [{ name: 'Prefix is: -', type: 'COMPETING'}],
        status: 'online',
    })
    await Mongoose.connect('mongodb+srv://twuben:%40DJmix224@cluster0.1qmgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { keepAlive: true })
});