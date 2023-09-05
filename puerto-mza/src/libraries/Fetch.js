import { getToken, invalidToken } from "./Auth";

const callAPI = async (endpoint, options = {}, headersJson = true) => {
  const token = getToken();

  if (headersJson) {
    options.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    };
  }
  const URL = endpoint;
  const response = await fetch(URL, options);
  const data = await response.json();
  if(data.status == 401){
    invalidToken();
  }
  return data;
}

const Fetch = {
  get(endpoint, options) {

    return callAPI(endpoint, options).then(response => {
      return response;
    })
  },
  postMethod(endpoint, data) {
    return callAPI(endpoint, {
      method: "POST",
      body: data,
    });
  }
}

export default Fetch;