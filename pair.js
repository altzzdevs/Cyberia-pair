const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, getAggregateVotesInPollMessage, DisconnectReason, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')

const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function MALVIN_XD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);

        try {

            var items = ["Safari"];

            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }

            var randomItem = selectRandomItem(items);

            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);

                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on("connection.update", async (s) => {

                const {
                    connection,
                    lastDisconnect
                } = s;

                if (connection == "open") {
                    await delay(5000);

                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;

                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }

                    const randomText = generateRandomText();

                    try {

                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');

                        let md = "cyberia~" + string_session;

                        let code = await sock.sendMessage(sock.user.id, { text: md });

                        let desc = `*Welcome to Cyberia-MD!* 🚀

Your *Cyberia Bot Session* has been successfully generated.

🔑 *Session ID:* Sent above  
⚠️ *Keep it private and secure!* Never share this code with anyone.

——————  

*📢 Official Updates & Community:*  
Join the Cyberia-MD Channel:  
https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A  

*🧩 Source Code & Development:*  
Build with Cyberia-MD on GitHub:  
https://github.com/NaCkS-ai/Drakonis-MD  

——————  

> *© Cyberia-MD – Powering the Future*  
Stay connected, stay innovative. 💻`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "⚡ Cyberia-MD Pairing",
                                    thumbnailUrl: "https://files.catbox.moe/x8vle8.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        },
                        { quoted: code })

                    } catch (e) {

                        let ddd = sock.sendMessage(sock.user.id, { text: e });

                        let desc =
`*Cyberia-MD Connection Successful!* 🚀

Your *Cyberia Session* has been created successfully.

🔑 *Session ID:* Sent above  
⚠️ Keep it safe and confidential!

——————  

*📢 Stay Updated:*  
Join the Cyberia-MD Channel:  
https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A  

*🧩 Source Code:*  
Explore Cyberia-MD on GitHub:  
https://github.com/NaCkS-ai/Drakonis-MD  

——————  

> *© Cyberia-MD*  
Innovation at your fingertips. 🌐`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "⚡ Cyberia-MD Pairing",
                                    thumbnailUrl: "https://i.imgur.com/GVW7aoD.jpeg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VbA6MSYJUM2TVOzCSb2A",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        },
                        { quoted: ddd })
                    }

                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);

                    console.log(`👤 ${sock.user.id} 💙 Cyberia-MD Connected Successfully ✅ Restarting process...`);

                    await delay(10);
                    process.exit();

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    MALVIN_XD_PAIR_CODE();
                }
            });

        } catch (err) {
            console.log("⚠️ Cyberia-MD Service Interrupted — Restarting...");
            await removeFile('./temp/' + id);

            if (!res.headersSent) {
                await res.send({ code: "❗ Cyberia-MD Service Unavailable" });
            }
        }
    }

    return await MALVIN_XD_PAIR_CODE();
});

/*
setInterval(() => {
    console.log("🔁 Cyberia-MD Auto Restart...");
    process.exit();
}, 180000); //30min
*/

module.exports = router;
