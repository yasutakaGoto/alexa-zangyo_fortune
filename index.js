'use strict';
const Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var text = [
  "は、残業です。",
  "は、早く帰れそうにありません。",
  "は、帰りが遅くなるでしょう",
  "は、日付が変わる前に帰れないでしょう。"
]

const handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        var intent = this.event.request.intent
        this.emit('Fortune', intent)
    },
    'Fortune' : function (intent) {
      var name = intent.slots.Name.value;
      var date = intent.slots.Date.value;
      var ran = Math.floor(Math.random() * text.length)
      
      if(!date) {
        var dt = new Date()
        var hypthn = "-"
        date =  dt.getFullYear() + hypthn + (dt.getMonth() + 1) + hypthn + dt.getDate()
      }
      
      if(!name){
        this.emit('SayUnknown')
      } else if (name === "清水さん") {
        this.emit(':ask', date + "、" + name + "は、18時には帰るでしょう。")
      } else {
        this.emit(':ask', date + "、" + name + text[ran]);
        // this.response.speak( date + "、" + name + text[ran]);
      }
      this.emit(':responseReady');
    },
    'SayHello': function () {
        this.emit(':ask', 'こんにちは。残業占いです。');
    },
    'SayUnknown': function (){
        this.emit(':ask', 'だれを占いますか？')
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'This is the Hello World Sample Skill. ';
        const reprompt = 'Say hello, to hear me speak.';

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('さようなら。残業しないで早く帰りましょう');
        this.emit(':responseReady');
    }
};
