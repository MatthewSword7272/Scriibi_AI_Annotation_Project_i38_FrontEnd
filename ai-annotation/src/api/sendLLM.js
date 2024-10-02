import axios from "axios"

export default function sendLLM(textComponentID) {
    return axios.post('url', {
        'componentID': textComponentID
    })
}