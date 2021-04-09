import ax from 'axios';

require('dotenv').config();

export const axios = ax.create({
  baseURL: process.env.SERVER,
});