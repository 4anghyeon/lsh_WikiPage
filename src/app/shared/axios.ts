import axios from 'axios';

export const wikiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
