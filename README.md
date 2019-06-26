# tie-api-example-telegram
This node.js example connector makes a Teneo bot available on Telegram. The connector acts as middleware between Telegram and Teneo. This guide will take you through the steps of deploying the connector to respond to events sent by Teneo. Interaction possibilities with Telegram are numerous, this example is based on a no-frills Telegram wrapper called [Slimbot](https://github.com/edisonchee/slimbot).


## Prerequisites

### Telegram App
Telegram app should already be installed and running with an active account on your device.
For development, the desktop version of the app is recommended.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.


## Setup instructions
### Setup a bot with Telegram's Botfather
1. Telegram uses a bot called "Botfather", that works as a wizard, to help developers setup projects. In your app, add "Botfather" as a contact.
2. Start a new chat with Botfather, and send him "/newbot" as a text message to trigger the setup process.
3. Follow Botfather's indications to give your bot a new `name`, and `bot_user_name`. 
4. Botfather will now give you an `HTTP_API_TOKEN`. Store it somewhere safe, and copy it for the following steps.


### Running the connector locally
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-telegram.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 
3. Create a `.env` file in the folder where you stored the source, and add values for TENEO_ENGINE_URL and HTTP_API_TOKEN:
    ```
    TENEO_ENGINE_URL=<your_engine_url>
    HTTP_API_TOKEN=<the value obtained in the previous section>
    ```
4. Start the connector in Console:
    ```
    node server.js
    ```

### Start chatting with the bot.
Go back to Telegram and add the bot's `user_name` you created previously, as a contact.
That's it! Your bot should now be available in Telegram and responding to messages that are sent to it.
