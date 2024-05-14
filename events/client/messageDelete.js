module.exports = async(client, message) => {

    /* snipes the messages if it get's delete from the snipe command, also need to make the logger for this */
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first.proxyURL : null
        })
    }
