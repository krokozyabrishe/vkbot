const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');


const steps = require('./steps');

const bot = new Bot({
    token: '92cbfb1f8caa44d38015580944023837cab82eaa2c18b186bcf1bcd09f1e7a73374bf0819e20dd9f387e0',
    group_id: 203582965
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {
    
    let info = message.payload && steps[JSON.parse(message.payload)] || steps[''];
    let keyboard = new Keyboard(true);
for(let i=0; i<info.btns.length; i++){
    if (i) keyboard.addRow();
    const btn = info.btns[i];

    keyboard.addButton(btn.msg, KeyboardColor.PRIMARY, JSON.stringify(btn.next))
}


   


    reply(info.question, {keyboard}).catch(e => console.error(e));
})

bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})
