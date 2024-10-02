import axios from "axios"

export default function sendOriginalTextSample(url, reqBody, apiKey) {
    return axios.post(`${url}/text_sample_annotation?code=${apiKey}`, {
        text: reqBody.text,
        annotationType: 3,
        skillLevelId: reqBody.skillLevelId,
        textSampleId: 6
    })
}