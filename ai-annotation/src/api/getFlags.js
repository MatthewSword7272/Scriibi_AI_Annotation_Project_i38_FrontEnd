import axios from "axios";

export default function getFlags(url, key)
{
    return axios.get(`${url}/flags/?code=${key}`);
}