import axios from "axios";

export default function getTextComponentsForSkill(url, skillID, apiKey) {
    console.log(skillID)
    return axios.get(`${url}/text_component/${skillID}?code=${apiKey}`);
}