import axios from "axios"

export default function processText(url, reqBody, apiKey) {
    console.log("Sending text for processing to " + `${url}/annotate`)

    return axios.post(`${url}/annotate`, {
        skill_id: reqBody.skillID,
        text: reqBody.text
    })
}