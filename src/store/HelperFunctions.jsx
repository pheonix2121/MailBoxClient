import axios from "axios";

export const formatEmail = (email) => {
    return email.replace(/[.@]/g, '-');
};


export const sentForInbox = async ({ toEmail, data }) => {
    const formattedEmail = await formatEmail(toEmail)
    try {
        const res = await axios.post(
            `https://mailboxclient-e4406-default-rtdb.asia-southeast1.firebasedatabase.app//${formattedEmail}/inbox.json`,
            {
                data
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }  
}

export const sentForSentbox = async ({ fromEmail, data }) => {
    const formattedEmail = await formatEmail(fromEmail)
    try {
        const res = await axios.post(
            `https://mailboxclient-e4406-default-rtdb.asia-southeast1.firebasedatabase.app//${formattedEmail}/sent.json`,
            {
                data
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }
}