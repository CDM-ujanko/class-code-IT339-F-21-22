import axios from 'axios';

const apiUser = process.env.USER_SERVICE_USER;
const key = process.env.USER_SERVICE_KEY;

export async function check(username, password) {
  return axios.post(`${process.env.USER_SERVICE_URL}/user/check/` + username, {
    username: username,
    password: password
  }, {
    auth: {
      username: apiUser,
      password: key
    },
  })
}

export async function find(username) {
  return axios.get(`${process.env.USER_SERVICE_URL}/user/` + username, {
    auth: {
      username: apiUser,
      password: key
    },
  })
}