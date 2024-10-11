import axios from "axios";

export default function sendOriginalTextSample(url, reqBody, apiKey) {
    return axios.post(`${url}/text_sample_annotation`, {
        text: reqBody.text,
        annotationType: 1,
        sampleId: 6
    })
}