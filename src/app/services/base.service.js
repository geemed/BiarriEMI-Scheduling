import axios from "axios";

export const get = (url, params) =>
  axios.get(url, {
    parms: { ...params },
  });
