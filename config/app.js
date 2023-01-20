(function(){"use strict";var e=require("crypto"),n=require("base64url"),i=require("fs"),r=Date.now(),t=n(e.randomBytes(64));i.appendFile("./config/app.js","\n//UNIX="+r+"\n//APP_KEY="+t,function(e){if(e)throw e}),i.appendFile(".env","\n#UNIX="+r+"\n#APP_KEY="+t,function(e){if(e)throw e;process.exit(0)})}).call(this);

//UNIX=1674058401384
//APP_KEY=4KlDTzbXG_694I9kB_tAwut9hzLZz1JfuuOpfOgyvebqvkDkbd-e1j5o-VB6GTTvd35j-HIiCynwI3BIq8IxCA