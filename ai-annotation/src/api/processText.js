import axios from "axios"

export default function processText(url, reqBody, apiKey) {
    console.log("Sending text for processing to " + `${url}/annotate?code=${apiKey}`)

    return axios.post(`${url}/annotate?code=${apiKey}`, {
        skill_id: reqBody.skillID,
        text: reqBody.text
    })
}