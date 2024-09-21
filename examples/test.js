import { bridgeDirect } from "../dist/index";

bridgeDirect.events.directInitialize.subscribe(e => {
    
    // sending a message before the event is fired will result in an error.

    bridgeDirect.sendMessage("Welcome from bedrock!")

})