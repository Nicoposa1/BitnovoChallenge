import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'https://payments.pre-bnvo.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_KEY}`,
  },
});