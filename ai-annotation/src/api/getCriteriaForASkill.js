import axios from "axios";

export default function getCriteriaForASkill(url, skillID, apiKey) {
    return axios.get(`${url}/criteria/${skillID}?code=${apiKey}`, {
        headers: {
            "Content-Type": 'application/JSON',
        },
    });
}