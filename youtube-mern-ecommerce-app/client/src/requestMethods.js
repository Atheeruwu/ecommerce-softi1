import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWQzOTQ0YTI0YzcxYzA2YTRjMTBiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTE2MDUwNiwiZXhwIjoxNjgxNDE5NzA2fQ.Hr8NRkZ_XNQAkYseHaQS685hsggliQcjs-x7KKc_B9I"
    
  // JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
  //   .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
