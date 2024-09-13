import Pushbullet from "./lib/Pushbullet.mjs";

export const handler = async (event, context, callback) => {
    console.log("event", event)
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
    const response = await Pushbullet.send_alert(pushTitle, pushBody)
    console.log("response", response)
};
