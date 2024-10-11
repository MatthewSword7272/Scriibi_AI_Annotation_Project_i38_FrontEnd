import axios from "axios";

export default function getSkillsList(url, apiKey) {
    return axios.get(`${url}/skills?code=${apiKey}`, {
        headers: {
            "Content-Type": 'application/JSON',
        },
    });
}