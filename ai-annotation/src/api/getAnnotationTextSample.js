import axios from "axios";

export default function getAnnotation(url, textSampleAnnotationId, apiKey) {
    return axios.get(`${url}/text_sample_annotation/${textSampleAnnotationId}`);
}