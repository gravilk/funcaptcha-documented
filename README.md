# ArkoseLabs FunCaptcha documented & solved
This repository contains files that will make solving ArkoseLabs FunCaptcha easier, if not solve it instantly.
This solver worked on **July 4th 2023**. It is possible that something in the FunCaptcha security has changed since then.
This solver is not flagging with the fingerprints included but I strongly suggest changing them to something else. Tutorial on how to do this will be provided below.

## How FunCaptcha works
FunCaptcha has 2 general types of how it can be solved. It can either be auto-solved or solved by playing a "game".
There are various types of games. Most of them require AI. This solver abuses the auto-solve ability on FunCaptcha.
If the body sent in the first request is "good enough" the captcha will automatically let you pass. If not, it will give you a "game".
The body included in this script is an example from one of my spoofed browsers. If you are using this solver on a small scale you will be fine using one or two fingerprints. If you are solving captchas on mass scale though, you will have
to make a database of possible fingerprints and implement something to change them every request.

## How to try this and continue development?
The main script is in `create_bda.js`. It is **ONLY CONFIGURED FOR TWITTER**. You will have to do some work in order to get it working for different websites.
Soon I might make this process easier and document more of what the captcha does. For now, you can figure everything out by yourself by using the deobfuscator in `index.js`.
Put the latest FunCaptcha script in a file called `script.js` and run `node index.js`. This should output a new file which contains the deobfuscated source code.
Most of the names in the captcha are still preserved so you won't have to deal with random alphabet letters. The code is generally very readable.


## Improvements soon
Soon I'll document a lot of this captcha's inner functionality and make the development process easier for anyone who wants to fork this.
It is also worth noting that the fingerprints provided have to be changed with the hashes because for now I haven't implemented anything to automatically hash certain information.
This repository is generally not recommended for use aside from the deobfuscator. If you are looking for a bypass, you'll have to wait some time.