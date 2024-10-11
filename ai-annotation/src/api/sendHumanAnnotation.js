import axios from "axios"

export default function sendHumanAnnotatedSample(url, reqBody, apiKey) {
    return axios.post(`${url}/text_sample_annotation`, {
        text: reqBody.text,
        annotationType: 3,
        skillLevelId: reqBody.skillLevelId,
        sampleId: 6
    })
}