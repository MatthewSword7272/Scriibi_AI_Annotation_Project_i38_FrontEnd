import axios from "axios";

export default function getFlagsForTextComponents(url, skillID, key)
{
    return axios.get(`${url}/flags/${skillID}?code=${key}`);
}