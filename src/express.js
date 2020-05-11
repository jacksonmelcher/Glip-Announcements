import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
// import moment from "moment";
// import fs from "fs";
import { eventHandler } from "./eventHandler";
import remind from "./remind";

// const yellow = "\x1b[33m%s\x1b[0m";
// const cyan = "\x1b[36m%s\x1b[0m";
// const red = "\x1b[42m%s\x1b[0m";

let newReminders = [];

let arrayBool = false;

const handle = async (event) => {
    let reminderMessage;
    let reminderTime;
    let timeCreated;
    let creator;
    let groupId;
    let duration;

    const { text, bot, type, group } = event;

    // let newReminders = JSON.parse(
    //     fs.readFileSync("json/completed-reminders.json", "utf8")
    // );
    await eventHandler(event);
    // try {

    //     if (newReminders.length > 0) {
    //         newReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    // arrayBool = true;

    // if (arrayBool === true) {
    //     let jsonData = JSON.stringify(newReminders, null, 2);
    //     fs.writeFile("json/reminders.json", jsonData, (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // }
    // arrayBool = false;

    // // ANCHOR Set timeout
    // if (newReminders.length > 0) {
    //     reminderMessage = newReminders[0].text;
    //     reminderTime = newReminders[0].reminderTime;
    //     timeCreated = newReminders[0].timeCreated;
    //     creator = newReminders[0].creator;
    //     groupId = newReminders[0].groupId;
    //     duration = newReminders[0].duration.as("milliseconds");
    // }

    // setTimeout(async () => {
    //     if (typeof bot !== "undefined") {
    //         await bot.sendMessage(groupId, {
    //             attachments: [
    //                 {
    //                     type: "Card",
    //                     text: `**${reminderMessage}**`,
    //                     footnote: {
    //                         text: `Reminder created by ${creator}`,
    //                     },
    //                 },
    //             ],
    //         });
    //     }
    // }, duration);
};

// ANCHOR Array monitor and manipulation
setInterval(() => remind(), 2000);

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
    async () =>
        put(
            `${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`,
            undefined,
            {
                auth: {
                    username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
                    password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD,
                },
            }
        ),
    24 * 60 * 60 * 1000
);

// export default handle;

// if (newReminders.length > 0) {
//     console.log("Length: " + newReminders.length);
//     console.log(
//         "Reminder Time: " +
//             newReminders[0].reminderTime.format("MM/DD/YYYY hh:mm")
//     );
//     console.log("Current Time: " + moment().format("MM/DD/YYYY hh:mm"));
//     if (moment() >= newReminders[0].reminderTime) {
//         console.log(newReminders[0].text);
//         newReminders.shift();
//         let jsonData = JSON.stringify(newReminders, null, 2);
//         fs.writeFile("json/reminders.json", jsonData, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// }
