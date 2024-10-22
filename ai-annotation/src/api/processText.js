import axios from "axios"

export default function processText(url, reqBody, apiKey) {
    return axios.post(`${url}/annotate?code=${apiKey}`, {
        skill_id: reqBody.skillID,
        text: reqBody.text
    })
}