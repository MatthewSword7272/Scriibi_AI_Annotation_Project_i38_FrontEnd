import axios from "axios"

export default function sendMachineAnnotation(url, reqBody, apiKey) {
    return axios.post(`${url}/text_sample_annotation?code=${apiKey}`, {
        text: reqBody.text,
        annotationType: 2,
        sampleId: reqBody.sampleId,
    })
}