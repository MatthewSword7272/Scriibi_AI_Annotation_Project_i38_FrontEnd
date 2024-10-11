import axios from "axios";

export default function getSkillsList(url, apiKey) {
    return axios.get(`${url}/skills`, {
        headers: {
            "Content-Type": 'application/JSON',
        },
    });
}