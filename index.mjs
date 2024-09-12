import dotenv from 'dotenv'
dotenv.config()
import Pushbullet from "./lib/Pushbullet.mjs";

export const handler = async (event, context, callback) => {
    const SNS = event.Records[0].Sns
    const pushTitle = SNS.Subject;
    if (typeof SNS.Message === "string") {
        try {
            SNS.Message = JSON.parse(SNS.Message)
        } catch (e) {}
    }
    const pushBody = typeof SNS.Message.NewStateReason === "string" ?
        SNS.Message.NewStateReason :
        SNS.Message

    console.log("sending alert: " + pushTitle + ": " + pushBody)
    await Pushbullet.send_alert(pushTitle, pushBody)
};
