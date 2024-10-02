import axios from "axios";

export default function getCriteriaForASkill(url, skillID, apiKey) {
    console.log(`${url}/criteria/${skillID}?code=${apiKey}`);
    return axios.get(`${url}/criteria/${skillID}?code=${apiKey}`, {
        headers: {
            "Content-Type": 'application/JSON',
            "Origin": "http://localhost:3000"
        },
    });
}