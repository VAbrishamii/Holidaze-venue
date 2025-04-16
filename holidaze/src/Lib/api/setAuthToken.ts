import axios from "axios";


export function setAuthToken(accessToken: string | null) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
