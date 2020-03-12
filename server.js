const TIE = require('@artificialsolutions/tie-api-client');
const Slimbot = require('slimbot');
require('dotenv').config();


const config = {
  telegramBotToken: process.env.HTTP_API_TOKEN,
  teneoURL: process.env.TENEO_ENGINE_URL
};


const slimbot = new Slimbot(config.telegramBotToken);

//Create Teneo API interface
const teneoApi = TIE.init(config.teneoURL);


// initialise session handler, to store mapping between Telegram and Engine session id
const sessionHandler = SessionHandler();

// Register listeners
slimbot.on('message', message => {
   handleTelegramMessage(message)
});


slimbot.on('edited_message', edited_message => {
  // reply when user edits a message
  slimbot.sendMessage(edited_message.chat.id, 'Message edited');
});


async function handleTelegramMessage(telegramMessage){

  console.log(`userInput: ${telegramMessage.text}`);

  const userID = telegramMessage.from.id

  // check if we have stored an engine sessionid for this caller
  const teneoSessionId = sessionHandler.getSession(userID);

  // send input to engine using stored sessionid and retreive response
  const teneoResponse = await teneoApi.sendInput(teneoSessionId, { 'text': telegramMessage.text });
  teneoTextReply = teneoResponse.output.text;
  console.log(`teneoResponse: ${teneoTextReply}`);

  // store engine sessionid for this caller
  sessionHandler.setSession(userID, teneoResponse.sessionId);

  slimbot.sendMessage(telegramMessage.chat.id, teneoTextReply);
}


// Call API
slimbot.startPolling();
console.log("Teneo-Telegram Connector listening...")


/***
 * SESSION HANDLER
 ***/
function SessionHandler() {

  // Map the Webchat Sid id to the teneo engine session id. 
  // This code keeps the map in memory, which is ok for testing purposes
  // For production usage it is advised to make use of more resilient storage mechanisms like redis
  const sessionMap = new Map();

  return {
    getSession: (userId) => {
      if (sessionMap.size > 0) {
        return sessionMap.get(userId);
      }
      else {
        return "";
      }
    },
    setSession: (userId, sessionId) => {
      sessionMap.set(userId, sessionId)
    }
  };
}
