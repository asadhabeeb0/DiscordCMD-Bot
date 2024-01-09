require('dotenv').config()

const { Client, WebhookClient, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: ['MESSAGE','REACTION']
});

const webhookClient = new WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN,
});

const PREFIX = "$";

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in.`);
});

client.on("messageCreate", async (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
    if (CMD_NAME === 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permission to use thta command');
        if(args.length === 0) 
        return message.reply('Please provide an ID');
    const member = message.guild.members.cache.get(args[0]);
    if(member){
        member
        .kick()
        .then((member)=> message.channel.send(`${member} was kicked.`))
        .catch((err)=> message.channel.send('I can not kick that user :('));
    }else {
        message.channel.send('That member was not found');
    }
    }else if(CMD_NAME === 'ban') {
        const member = message.guild.members.cache.get(message.author.id); // Get the member object from cache

        if (!member || !member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to use that command');
        }
        if(args.length === 0) 
        return message.reply('Please provide an ID');
    try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully');
    } catch (error) {
        console.log(error);
        message.channel.send('An error occured. Either I do not have permission or the user was not found');
    }
    } else if(CMD_NAME === 'announce'){
        console.log(args);
        const msg = args.join(' ');
        console.log(msg);
        webhookClient.send(msg);
    }
    }
});

client.on('messageReactionAdd', (reaction, user)=>{    
    console.log('Hello');
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '1194145747243896830'){
        switch (name) {
            case '�':
                member.roles.add('1194145747243896834');
                break;
            case '�':
                member.roles.add('1194145747243896836');
                break;
            case '�':
                member.roles.add('1194145747243896838');
                break;
            case '�':
                member.roles.add('1194145747243896839');
                break;
        }
    }
});


client.on('messageReactionRemove', (reaction, user)=>{    
    console.log('Hello');
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '1194145747243896830'){
        switch (name) {
            case '�':
                member.roles.remove('1194145747243896831');
                break;
            case '�':
                member.roles.remove('1194145747243896833');
                break;
            case '�':
                member.roles.remove('1194145747243896835');
                break;
            case '�':
                member.roles.remove('1194145747243896837');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);