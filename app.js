'use strict';
// Import Twit NPM Package
const twit = require('twit');

// Load User config
const [TWITTERCONFIG, USERDATACONFIG, APPCONFIG] = require('./config');

// Load Filesystem Modules
const fs = require('fs');

// Initialize Twit Library with API Config
let T = new twit(TWITTERCONFIG);


/* Function to get Random Pic of user's folder
   @returns: Base64 encoded File of 'path'
 */
function getRandomPathPic(path) {
    let retValue = fs.readdirSync(path);
    let random = retValue[Math.floor(Math.random()*retValue.length)];
    return fs.readFileSync(path+random, {encoding: 'base64'});
}


// Set current ID for first run
let sinceID = "1";
T.get("https://api.twitter.com/1.1/statuses/mentions_timeline.json", {count: 1}, (err, data) => sinceID = data[0].id_str);

// Whole logic for tweeting images etc.
setInterval(() => T.get("https://api.twitter.com/1.1/statuses/mentions_timeline.json", {since_id: sinceID}, (err, data) => {
    if(data instanceof Array && data.length !==0) {
        data.forEach(tweet => {
            USERDATACONFIG.forEach(type => {
                let found = false;
                type.data.forEach(word => {
                    if(!found) {
                        if (tweet.text.includes(word)) {
                            found = true;
                            T.post('media/upload', {media_data: getRandomPathPic(type.path)}, (error, media) => T.post("https://api.twitter.com/1.1/statuses/update.json", {
                                in_reply_to_status_id: tweet.id_str,
                                status: "",
                                auto_populate_reply_metadata: true,
                                media_ids: media.media_id_string
                            }));
                        }
                    }
                });
            });
        });
        sinceID = data[0].id_str;
    }
}), APPCONFIG.INTERVALCHECK);
