'use strict'
var token = '210145687:AAGY_ggOwPDNvA8LuiwKFsS4vWcRN-L-yhM';

var _ = require('lodash'),
    fs = require('fs'),
    Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, {polling: true});

console.log('bot server started...');

bot.onText(/^\/say_hello (.+)$/, function(msg, match){
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!')
      .then(function(){
      });
});

bot.onText(/^\/diary_goals$/, function(msg, match){
  var user = msg.from.username;
  let tasks = goalsDiaryList(user);
  bot.sendMessage(msg.chat.id, 'Your Task' + tasks)
      .then(function(){
      });
});

function goalsDiaryList (user) {
  let file = fs.readFileSync('task.json');
  let taskList = JSON.parse(file);
  console.log(taskList);
  console.log(user);
  let diary_goals = taskList.filter(filterByDate).filter(filterByUser(user)).map((task) => {
      return task.name+'\n';
  });
  console.log(diary_goals);

  return diary_goals;
 }

function filterByDate (task) {
  let today = new Date();
  let taskDate = new Date(task.create);

  return ((today.getTime() - taskDate.getTime()) < 1);
}

function filterByUser (user) {
  return function (element){
    return element.user === user;
  }
}
