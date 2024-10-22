import axios from "axios";

export default function sendTextSample(url, studentName, apiKey) {
    return axios.post(`${url}/text_sample?code=${apiKey}`, {
        student_name: studentName,
    })
}