const TOKEN_KEY = 'auth_token';
const LAST_ACTIVITY_KEY = 'last_activity_datetime';

const saveLastActivity = () => {
    const now = new Date().toISOString();
    localStorage.setItem(LAST_ACTIVITY_KEY, now);
};
const getLastActivity = () => {
    return localStorage.getItem(LAST_ACTIVITY_KEY);
};

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default {
  saveToken,
  getToken,
  removeToken,
  saveLastActivity,
  getLastActivity,
};
