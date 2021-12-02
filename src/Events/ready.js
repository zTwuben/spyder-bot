const Event = require("../Structures/Event.js");
const Mongoose = require('mongoose');

module.exports = new Event("ready", (client) => {
    console.log("Bot is online!")
    client.user.setPresence({
        activities: [{ name: 'Prefix is: -', type: 'COMPETING'}],
        status: 'online',
    })
    await Mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
});