import { storageNameToken } from "../constans/LocalStorage.constans";
import { existLocalStorage, getLocalStorage, removeLocalStorage, saveLocalStorage } from "../utils/LocalStorage";


export const saveToken = () => {
  const token = getTokenFromURL();
  if (token.length > 0) {

    if (isDifferentToken(token)) {
      saveLocalStorage(storageNameToken, token);
    }
  }
}

const isDifferentToken = (newToken) => {
  return newToken != getToken() && newToken.length > 0;
}
export const getTokenFromURL = () => {
  let token = window.location.search.replace('?', '').split('&').find(item => item.includes('token'))?.split('=')[1];
  return token == undefined ? '' : token
}

export const invalidToken = () => {
  removeLocalStorage(storageNameToken);
}

export const decodeToken = (token) =>{
  return decode(token);
}

const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));

export const getToken = () => {
  return getLocalStorage(storageNameToken)
}

export const isActiveToken = () => {
  return existLocalStorage(storageNameToken);
}
