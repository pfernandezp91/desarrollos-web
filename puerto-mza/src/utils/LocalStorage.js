const getCurrentToken = () => {
    const key = `blogToken${process.env.CURRENT_ENV || 'QA'}`; // default to 'development' if ENV is not defined
    return localStorage.getItem(key);
  }
  
  const saveToken = (newToken) => {
    const key = `blogToken${process.env.CURRENT_ENV || 'QA'}`;
    const currentToken = getCurrentToken();
  
    if (newToken !== currentToken) {
      localStorage.setItem(key, newToken);
      return newToken;  // Return the new token if you want, or adjust as needed
    }
  
    return currentToken;  // Return the current token if there was no update, or adjust as needed
}

export { getCurrentToken, saveToken };

