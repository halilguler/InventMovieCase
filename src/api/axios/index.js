import axios from "axios";
const API_KEY = ""
const API_URL = "";

const buildRequestForApi = (
    endpoint,
    method,
    requestObj,
    headers = { "Content-Type": "application/json" }
) => {
    console.log(headers);
    return {
        url: `${API_URL}${endpoint}`,
        method: method,
        headers: {
            ...headers,
        },
        data: {
            ...requestObj,
        },
    };
};

export const defaultApi = (endpoint, method, requestObj = "") => {
    return axios(
        buildRequestForApi(endpoint, method, requestObj, {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':true,
            'Content-Type': 'application/json',
        })
    );
};