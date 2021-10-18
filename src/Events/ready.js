const Event = require("../Structures/Event.js");


module.exports = new Event("ready", (client) => {
    console.log("Bot is online!")
    client.user.setPresence({
        activities: [{ name: 'Prefix is: -', type: 'COMPETING'}],
        status: 'online',
    })
});