import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_DATA_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});

export default http;
