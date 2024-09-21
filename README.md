# BridgeDirect
This pack provides a library that can be used to send messages and embeds to discord form a bedrock bds server.

> [!NOTE]  
> This class is intended to be used inside a Minecraft Bedrock scripting addon.
> Despite the class being able to run on any minecraft world, it will work only when run along with [BedrockBridge](https://github.com/InnateAlpaca/BedrockBridge),
> which is currently available for bds server (and not realms or local worlds).

> [!NOTE]  
> This library works for all BedrockBridge versions since v1.4.2, which runs on Minecraft Bedrock Edition v1.21.30. Previous versions are not supported.

## What does the library do?
With this library you have access to a `BridgeDirect` instance. A simple class that handles sending messages to [BedrockBridge](https://github.com/InnateAlpaca/BedrockBridge) through scriptevents. BedrockBridge will handle the discord connection part.

## How to use it?
You can either copy the code of the class to your project, or install the npm package and then [bundle your pack](https://jaylydev.github.io/posts/bundle-minecraft-scripts-esbuild/).

```js
import { bridgeDirect } from "@esploratori/bedrock";

bridgeDirect.events.directInitialize.subscribe(() => {

    bridgeDirect.sendMessage("Welcome from bedrock!")

})

```

If you copy the file, the first line of this code will probably look like this `import { bridgeDirect } from "./index.js"`.

![direct_example](https://github.com/user-attachments/assets/d76bacbb-8c7a-4e21-ac28-9df864df438f)

Be careful when using the library that the directInitialize event has been sent, otherwise trying to send messages will result in an error.

1. A possible approach to this problem could be checking if the connection is ready before sending logs.
```js
// ...
import { world } from "@minecraft/server"

world.afterEvents.itemUse.subscribe(e=>{
    if (e.itemStack.nameTag==="legendary-item"){

        if (bridgeDirect.ready){ // making sure that the bridge is active
            bridgeDirect.sendMessage(e.source.name + " used a legendary item", "Legendary News")
        }
    }
})
```
2. While another approach could be including your pack logic inside the bridgeInitialize event.
```js
// ...
bridgeDirect.events.directInitialize.subscribe(()=>{

    world.afterEvents.itemUse.subscribe(e => {
        if (e.itemStack.nameTag === "legendary-item") {
            bridgeDirect.sendMessage(e.source.name + " used a legendary item", "Legendary News")
        }
    })
    
})
```

Of course which solution to use depends on the purpose of your pack.
If your pack wants to provide additional discord capabilities to a well pre-established in-game mechanic then it would make sense to use the first solution.
If you are developing a pack mostly focused on the discord connection then probably the second solution is preferable.

It is however advisable to handle the connection delay, or the possibility that BedrockBridge is not installed, by e.g. caching the messages untill the bridge is ready, or sending logs to the users if the connection hasn't been established for a long time (which means that there is something wrong). A typical setup delay would be 2-5 seconds.

## Releasing your addon
Here comes the sensitive part. This library is opensource. It can be used, copied, included in your addon and modified without restrictions.
However it's not the same for BedrockBridge. You can add a link to [our download page](https://github.com/InnateAlpaca/BedrockBridge/releases) to your page.


> [!WARNING]  
> You cannot include BedrockBridge in your pack or add a direct download link to BedrockBridge.
