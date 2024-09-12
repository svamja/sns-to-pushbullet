import dotenv from 'dotenv'
dotenv.config()

const ACCESS_TOKEN = process.env.PUSHBULLET_TOKEN;
const DEVICE_ID = process.env.PUSHBULLET_DEVICE_ID;

const Pushbullet = {

    async send_alert(title, message) {
        const payload = {
            type: 'note',
            title: title,
            body: message,
            device_iden: DEVICE_ID,
        };
        return await fetch('https://api.pushbullet.com/v2/pushes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': ACCESS_TOKEN,
            },
            body: JSON.stringify(payload),
        })
    },

}

export default Pushbullet;
