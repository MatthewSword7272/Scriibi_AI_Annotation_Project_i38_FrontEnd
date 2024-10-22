import axios from "axios";

export default function sendTextSample(url, studentName, apiKey) {
    console.log(`${url}/text_sample?code=${apiKey}`)
    return axios.post(`${url}/text_sample?code=${apiKey}`, {
        student_name: studentName,
    })
}