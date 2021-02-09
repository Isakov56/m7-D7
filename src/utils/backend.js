import axios from "axios";

const backend = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
  headers: {
    Authorization: process.env.REACT_APP_TOKEN,
  },
});

export default backend;
